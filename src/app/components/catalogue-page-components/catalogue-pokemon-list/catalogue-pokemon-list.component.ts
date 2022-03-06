import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormattedPokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-catalogue-pokemon-list',
  templateUrl: './catalogue-pokemon-list.component.html',
  styleUrls: ['./catalogue-pokemon-list.component.css'],
})
export class CataloguePokemonListComponent implements OnInit {
  @Input() allPokemonArr: FormattedPokemon[] = [];
  @Output() clicked: EventEmitter<FormattedPokemon> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public onPokemonClick(pokemon: FormattedPokemon): void {
    this.clicked.emit(pokemon);
  }
}
