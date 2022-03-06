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

const POKEMON_STORAGE_KEY = 'allPokemon';

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
    const storedUser = sessionStorage.getItem('user');
    if (!storedUser) return;

    this.capturedPokemon = JSON.parse(storedUser).pokemon;
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

  public setPokemon(allPokemonArr: FormattedPokemon[] | undefined): void {
    sessionStorage.setItem(POKEMON_STORAGE_KEY, JSON.stringify(allPokemonArr));
  }

  public clearPokemon(): void {
    this.capturedPokemon = [];
  }

  public addPokemon(pokemon: FormattedPokemon, username: string | undefined) {
    if (!username) return;

    const url = `${TRAINERS_API_URL}/${this.userService.user?.id}`;
    const oldPokemonArr = this.getUserPokemon(username);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': TRAINERS_API_KEY,
    });

    oldPokemonArr?.subscribe((oldPokemonArr) => {
      if (!oldPokemonArr) return;

      return this.http
        .patch(url, { pokemon: [...oldPokemonArr, pokemon.name] }, { headers })
        .subscribe((newUser) => {
          this.userService.setUser(newUser as User);
          this.capturedPokemon = [...oldPokemonArr, pokemon.name];
        });
    });
  }

  public removePokemon(pokemonName: string, username: string | undefined) {
    if (!username) return;

    const url = `${TRAINERS_API_URL}/${this.userService.user?.id}`;
    const oldPokemonArr = this.getUserPokemon(username);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': TRAINERS_API_KEY,
    });

    return oldPokemonArr?.subscribe((oldPokemonArr) => {
      if (!oldPokemonArr) return;

      const newPokemonArr = oldPokemonArr.filter(
        (_pokemon) => _pokemon !== pokemonName
      );

      this.http
        .patch(url, { pokemon: [...newPokemonArr] }, { headers })
        .subscribe((newUser) => {
          this.userService.setUser(newUser as User);
          this.capturedPokemon = [...newPokemonArr];
          location.reload();
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
