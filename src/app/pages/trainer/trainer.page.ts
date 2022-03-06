import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css'],
})
export class TrainerPage implements OnInit {
  public capturedPokemon: string[] = [];

  constructor(private readonly pokemonService: PokemonService) {}

  public ngOnInit(): void {
    this.capturedPokemon = [...this.pokemonService.capturedPokemon];
  }
}
