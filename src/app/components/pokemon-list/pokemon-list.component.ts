import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormattedPokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  @Input() pokemonArr: FormattedPokemon[] = [];
  @Output() clicked: EventEmitter<FormattedPokemon> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public onPokemonClick(pokemon: FormattedPokemon): void {
    this.clicked.emit(pokemon);
  }

  public capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
