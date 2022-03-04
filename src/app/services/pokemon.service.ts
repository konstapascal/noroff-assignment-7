import {
  PokemonApiResponse,
  Pokemon,
  FormattedPokemon,
} from '../models/pokemon.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const { POKEMON_API_URL, POKEMON_IMAGES_BASE_URL } = environment;

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private readonly http: HttpClient) {}

  public getPokemon(
    limit: number = 200,
    offset: number = 0
  ): Observable<FormattedPokemon[]> {
    // Getting initial response
    const response = this.http.get<PokemonApiResponse>(
      `${POKEMON_API_URL}?limit=${limit}&offset${offset}`
    );

    // Extracting pokemon results
    const pokemonArr = response.pipe(map((res) => res.results));

    // Constructing array of pokemon
    const formattedPokemonArr = pokemonArr.pipe(
      map((pokemonArr) =>
        pokemonArr.map((pokemon) => ({
          name: pokemon.name,
          imageUrl: this.getImageUrl(pokemon.url),
        }))
      )
    );

    return formattedPokemonArr;
  }

  private getImageUrl(url: string): string {
    const strIdx = url.search('/pokemon/');
    const idStartIdx = strIdx + 9;

    const id = url.slice(idStartIdx, url.length - 1);

    const imageUrl = `${POKEMON_IMAGES_BASE_URL}/${id}.png`;

    return imageUrl;
  }
}
