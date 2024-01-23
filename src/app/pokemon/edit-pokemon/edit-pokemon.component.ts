// This class is a component for editing a Pokemon.
// ngOnInit(): Initializes the component by getting the Pokemon name from the route, retrieving the corresponding Pokemon from the service,
// and setting the page title.
// initTitle(pokemon: Pokemon | undefined): Sets the page title based on the Pokemon's name, or sets it to 'Pokemon not found' if the Pokemon is undefined.

import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { PokemonFormComponent } from '../pokemon-form/pokemon-form.component';
import { Pokemon } from '../pokemon';
import { Title } from '@angular/platform-browser';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-edit-pokemon',
  standalone: true,
  imports: [NgIf, PokemonFormComponent, LoaderComponent],
  templateUrl: './edit-pokemon.component.html',
})
export default class EditPokemonComponent implements OnInit {
  pokemon: Pokemon | undefined;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private titleService: Title
  ) {}

  /**
   * Initializes the component with the Pokemon data based on the route parameter.
   *
   */
  ngOnInit() {
    const pokemonName: string | null = this.route.snapshot.paramMap.get('name');

    if (pokemonName) {
      this.pokemonService.getPokemonByName(pokemonName).subscribe((pokemon) => {
        if (pokemon) {
          this.pokemon = pokemon[0];
          this.initTitle(pokemon[0]);
        }
      });
    } else {
      this.pokemon = undefined;
    }
  }

  /**
   * Initializes the title based on the provided Pokemon object.
   *
   * @param {Pokemon | undefined} pokemon - The Pokemon object to set the title for
   * @return {void} 
   */
  private initTitle(pokemon: Pokemon | undefined): void {
    if (!pokemon) {
      this.titleService.setTitle('Pokemon not found');
      return;
    }

    this.titleService.setTitle(pokemon.name);
  }
}
