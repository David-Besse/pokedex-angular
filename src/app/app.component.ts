import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { POKEMONS } from './models/mock.pokemon-list';
import { Pokemon } from './models/pokemon';

@Component({
  selector: 'app-root', // name of the component
  standalone: true, // this component can be used in other components
  imports: [CommonModule, RouterOutlet], // import other modules
  templateUrl: './templates/app.component.html', // path to the template
  styleUrl: './templates/app.component.scss', // path to the stylesheet
})
export class AppComponent implements OnInit {
  pokemonList: Pokemon[] = POKEMONS;
  pokemonSelected: Pokemon[];

  /**
   * Initializes the component.
   *
   * @return {void} No return value.
   */
  ngOnInit() {
    console.log(`init AppComponent`);

    // Display all pokemons by default
    this.pokemonSelected = this.pokemonList;
  }

  /**
   * Filters the list of Pokemons based on the given name.
   *
   * @param pokemonName - The name of the Pokemon to filter by.
   * @returns An array of Pokemon objects that match the given name.
   */
  filterPokemons(pokemonName: string) {
    return (this.pokemonSelected = this.pokemonList.filter((pokemon) => {
      if (pokemon.name.toLowerCase().includes(pokemonName.toLowerCase())) {
        return pokemon;
      }
      return undefined;
    }));
  }
}
