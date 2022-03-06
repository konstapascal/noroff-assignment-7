import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { FormattedPokemon, PokemonApiResponse } from '../models/pokemon.model';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

const {
  POKEMON_API_URL,
  POKEMON_IMAGES_BASE_URL,
  TRAINERS_API_KEY,
  TRAINERS_API_URL,
} = environment;

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  public capturedPokemon: string[] = [];

  constructor(
    private readonly http: HttpClient,
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {
    this.getUserPokemon(userService.user?.username)?.subscribe(
      (userPokemon) => (this.capturedPokemon = userPokemon)
    );
  }

  public getAllPokemon(
    limit: number = 200,
    offset: number = 0
  ): Observable<FormattedPokemon[]> {
    const url = `${POKEMON_API_URL}?limit=${limit}&offset${offset}`;

    // Getting initial response
    const response = this.http.get<PokemonApiResponse>(url);

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

  public addPokemon(pokemon: FormattedPokemon, username: string | undefined) {
    if (!username) return;

    const oldPokemonArr = this.getUserPokemon(username);

    const url = `${TRAINERS_API_URL}/${this.userService.user?.id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': TRAINERS_API_KEY,
    });

    return oldPokemonArr?.subscribe((oldPokemonArr) => {
      if (!oldPokemonArr) return;
      if (oldPokemonArr.includes(pokemon.name)) return;

      return this.http
        .patch(url, { pokemon: [...oldPokemonArr, pokemon.name] }, { headers })
        .subscribe((newUser) => {
          this.userService.setUser(newUser as User);
          return newUser;
        });
    });
  }

  public getUserPokemon(
    username: string | undefined
  ): Observable<string[]> | undefined {
    if (!username) return;

    return this.authService
      .getUser(username)
      .pipe(map((user) => user?.pokemon || []));
  }

  private getImageUrl(url: string): string {
    const strIdx = url.search('/pokemon/');
    const idStartIdx = strIdx + 9;

    const id = url.slice(idStartIdx, url.length - 1);

    const imageUrl = `${POKEMON_IMAGES_BASE_URL}/${id}.png`;

    return imageUrl;
  }
}
