import { Component, OnInit } from '@angular/core';
import { FormattedPokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.css'],
})
export class CataloguePage implements OnInit {
  public pokemonArr: FormattedPokemon[] = [];

  constructor(private readonly pokemonService: PokemonService) {}

  public ngOnInit(): void {
    this.pokemonService
      .getPokemon()
      .subscribe((_pokemonArr) => (this.pokemonArr = _pokemonArr));
  }

  public onPokemonClick(pokemon: FormattedPokemon): void {
    console.log(`You just captured ${pokemon.name}!`);
  }
}
