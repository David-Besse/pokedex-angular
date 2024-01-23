// Page add a pokemon

import { Component, OnInit } from '@angular/core';
import { PokemonFormComponent } from '../pokemon-form/pokemon-form.component';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-add-pokemon',
  standalone: true,
  imports: [PokemonFormComponent, CommonModule],
  templateUrl: './add-pokemon.component.html',
})
export default class AddPokemonComponent implements OnInit {
  pokemon: Pokemon;

  /**
   * This code initializes a new instance of the Pokemon class when the component is first created
   *
   */
  ngOnInit() {
    this.pokemon = new Pokemon();
  }
}
