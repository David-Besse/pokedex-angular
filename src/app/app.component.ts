import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { POKEMONS } from './models/mock.pokemon-list';
import { Pokemon } from './models/pokemon';
import { PokemonTypeColorPipe } from "./pokemon-type-color.pipe";
import { BorderCardDirective } from './border-card.directive';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './templates/app.component.html',
    styleUrl: './templates/app.component.scss',
    imports: [
        CommonModule,
        RouterOutlet,
        PokemonTypeColorPipe,
        BorderCardDirective,
    ]
})
export class AppComponent implements OnInit {
  pokemonList: Pokemon[] = POKEMONS;
  pokemonSelected: Pokemon[] | undefined;

  ngOnInit() {
    console.log(`init AppComponent`);

    // Display all pokemons by default
    this.pokemonSelected = this.pokemonList;
  }

  searchByName(pokemonName: string) {
    const pokemonNameToLowerCase: string = pokemonName.toLowerCase();

    switch (pokemonNameToLowerCase) {
      case undefined: {
        this.pokemonSelected = undefined;
        break;
      }
      default: {
        this.pokemonSelected = this.pokemonList;
        break;
      }
    }

    const foundPokemon = this.pokemonList.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(pokemonNameToLowerCase);
    });

    this.pokemonSelected = foundPokemon;
  }

  searchById(id: string) {
    const parseId: number | undefined = parseInt(id);

    if (parseId === undefined || parseId <= 0) {
      this.pokemonSelected = this.pokemonList;
      return;
    }

    const foundPokemon = this.pokemonList.filter(
      (pokemon) => pokemon.id === parseId
    );

    this.pokemonSelected = foundPokemon;
  }

  selectPokemon(pokemon: Pokemon) {
    console.log(`select pokemon ${pokemon.name}`);
  }
}
