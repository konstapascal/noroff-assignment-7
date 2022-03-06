import { Component, OnInit } from '@angular/core';
import { FormattedPokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.css'],
})
export class CataloguePage implements OnInit {
  public allPokemonArr: FormattedPokemon[] = [];

  constructor(
    private readonly pokemonService: PokemonService,
    private readonly userService: UserService
  ) {}

  public ngOnInit(): void {
    this.pokemonService
      .getAllPokemon()
      .subscribe((_allPokemonArr) => (this.allPokemonArr = _allPokemonArr));
  }

  public onPokemonClick(pokemon: FormattedPokemon): void {
    this.pokemonService.addPokemon(pokemon, this.userService.user?.username);
  }
}
