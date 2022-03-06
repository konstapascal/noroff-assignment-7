import { Component, Input, OnInit } from '@angular/core';
import { FormattedPokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-catalogue-pokemon-card',
  templateUrl: './catalogue-pokemon-card.component.html',
  styleUrls: ['./catalogue-pokemon-card.component.css'],
})
export class CataloguePokemonCardComponent implements OnInit {
  @Input() pokemon?: FormattedPokemon;

  constructor(
    private readonly userService: UserService,
    private readonly pokemonService: PokemonService
  ) {}

  ngOnInit(): void {}

  public isPokemonCaptured(
    pokemon: FormattedPokemon | undefined
  ): boolean | undefined {
    if (!pokemon) return;
    const capturedPokemon = this.userService.user?.pokemon;
    return capturedPokemon?.includes(pokemon.name);
  }

  public onPokemonCaptureClick(pokemon: FormattedPokemon | undefined): void {
    if (!pokemon) return;

    this.pokemonService.addPokemon(pokemon, this.userService.user?.username);
  }

  public capitalize(word: string | undefined): string | undefined {
    if (!word) return;
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
