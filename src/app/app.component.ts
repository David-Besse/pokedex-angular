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
  pokemonSelected: Pokemon[] | undefined[] | undefined = [];

  ngOnInit() {
    console.log(`init AppComponent`);

    // Display all pokemons by default
    // this.pokemonSelected = this.pokemonList;
  }

  searchByName(pokemonName: string) {
    const pokemonNameToLowerCase = pokemonName.toLowerCase();

    const foundPokemon = this.pokemonList.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(pokemonNameToLowerCase);
    });

    this.pokemonSelected = foundPokemon;

    console.log('in searchbyname',this.pokemonSelected);
  }

  searchById(id: string) {
    const parseId: number = parseInt(id);

    const foundPokemon = this.pokemonList.filter(
      (pokemon) => pokemon.id === parseId
    );

    this.pokemonSelected = foundPokemon;

    console.log('in searchbyid',this.pokemonSelected);
  }
}
