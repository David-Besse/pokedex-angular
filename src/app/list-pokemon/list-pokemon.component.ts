import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { POKEMONS } from '../models/mock.pokemon-list';
import { Pokemon } from '../models/pokemon';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';
import { BorderCardDirective } from '../border-card.directive';

@Component({
  selector: 'app-list-pokemon',
  standalone: true,
  imports: [ CommonModule, PokemonTypeColorPipe, BorderCardDirective ],
  templateUrl: './list-pokemon.component.html',
  styleUrl: './list-pokemon.component.scss',
})
export class ListPokemonComponent implements OnInit {
  pokemonList: Pokemon[] = POKEMONS;
  pokemonSelected: Pokemon[] | undefined;

  ngOnInit() {
    console.log(`init AppComponent`);

    // Display all pokemons by default
    this.pokemonSelected = this.pokemonList;
  }
}
