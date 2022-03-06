import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormattedPokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-catalogue-pokemon-list',
  templateUrl: './catalogue-pokemon-list.component.html',
  styleUrls: ['./catalogue-pokemon-list.component.css'],
})
export class CataloguePokemonListComponent implements OnInit {
  @Input() allPokemonArr: FormattedPokemon[] = [];

  constructor() {}

  ngOnInit(): void {}
}
