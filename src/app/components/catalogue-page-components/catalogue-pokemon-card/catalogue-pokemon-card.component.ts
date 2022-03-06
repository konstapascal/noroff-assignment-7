import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormattedPokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-catalogue-pokemon-card',
  templateUrl: './catalogue-pokemon-card.component.html',
  styleUrls: ['./catalogue-pokemon-card.component.css'],
})
export class CataloguePokemonCardComponent implements OnInit {
  @Input() pokemon?: FormattedPokemon;
  @Output() clicked: EventEmitter<FormattedPokemon> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public onPokemonClick(pokemon: FormattedPokemon | undefined): void {
    this.clicked.emit(pokemon);
  }

  public capitalize(word: string | undefined): string | undefined {
    if (!word) return;
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
