import { Component, Input, OnInit } from '@angular/core';
import { FormattedPokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-trainer-pokemon-list',
  templateUrl: './trainer-pokemon-list.component.html',
  styleUrls: ['./trainer-pokemon-list.component.css'],
})
export class TrainerPokemonListComponent implements OnInit {
  @Input() capturedPokemon: string[] = [];

  constructor() {}

  ngOnInit(): void {}
}
