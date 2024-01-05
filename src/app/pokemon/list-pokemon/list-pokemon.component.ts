import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { POKEMONS } from '../mock.pokemon-list';
import { Pokemon } from '../pokemon';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';
import { BorderCardDirective } from '../border-card.directive';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  ngOnInit() {
    console.log(`init AppComponent`);

    // Display all pokemons by default
    this.pokemonSelected = this.pokemonList;
  }

  selectPokemon(pokemon: Pokemon) {
    this.router.navigate(['/pokemons', pokemon.id]);
  }
}
