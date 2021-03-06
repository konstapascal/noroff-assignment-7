import { Component, Input, OnInit } from '@angular/core';
import { FormattedPokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';
import { UserService } from 'src/app/services/user.service';
import formatId from 'src/utils/formatId';

@Component({
  selector: 'app-trainer-pokemon-card',
  templateUrl: './trainer-pokemon-card.component.html',
  styleUrls: ['./trainer-pokemon-card.component.css'],
})
export class TrainerPokemonCardComponent implements OnInit {
  @Input() pokemon?: string;
  formatId = formatId;

  constructor(
    private readonly pokemonService: PokemonService,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {}

  public capitalize(word: string | undefined) {
    if (!word) return;

    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  public getPokemonId(pokemon: string | undefined) {
    if (!pokemon) return;

    const sessionAllPokemon = sessionStorage.getItem('allPokemon');
    if (!sessionAllPokemon) return;

    const parsedAllPokemon = JSON.parse(sessionAllPokemon);
    const foundPokemon = parsedAllPokemon.find(
      (_pokemon: FormattedPokemon) => _pokemon.name === pokemon
    );

    return foundPokemon.id;
  }

  public getPokemonImageUrl(pokemon: string | undefined) {
    if (!pokemon) return;

    const sessionAllPokemon = sessionStorage.getItem('allPokemon');
    if (!sessionAllPokemon) return;

    const parsedAllPokemon = JSON.parse(sessionAllPokemon);
    const foundPokemon = parsedAllPokemon.find(
      (_pokemon: FormattedPokemon) => _pokemon.name === pokemon
    );

    return foundPokemon.imageUrl;
  }

  public onPokemonReleaseClick(pokemon: string | undefined) {
    if (!pokemon) return;
    this.pokemonService.removePokemon(pokemon, this.userService.user?.username);
  }
}
