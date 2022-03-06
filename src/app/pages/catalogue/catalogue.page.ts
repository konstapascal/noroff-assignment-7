import { Component, OnInit } from '@angular/core';
import { FormattedPokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.css'],
})
export class CataloguePage implements OnInit {
  public allPokemonArr: FormattedPokemon[] = [];

  constructor(private readonly pokemonService: PokemonService) {}

  public ngOnInit(): void {
    const sessionPokemon = sessionStorage.getItem('allPokemon');

    if (!sessionPokemon) {
      this.pokemonService.getAllPokemon().subscribe((_allPokemonArr) => {
        this.allPokemonArr = _allPokemonArr;
        this.pokemonService.setPokemon(_allPokemonArr);
      });
      return;
    }

    this.allPokemonArr = JSON.parse(sessionPokemon);
  }
}
