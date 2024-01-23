// This class is a component for a Pokemon form in an Angular application.
// ngOnInit(): Initializes the component by getting the list of Pokemon types and determining if it's an add form.
// hasType(type: string): boolean: Checks if the Pokemon has a specific type.
// selectType($event: Event, type: string): Adds or removes a type from the Pokemon.
// isTypesValid(type: string): boolean: Validates if the types selected for the Pokemon are valid.
// onSubmit(): Submits the form by adding or updating the Pokemon using the PokemonService.
// goBack(): Navigates back to the previous page based on the current URL.

import { NgIf, NgFor, NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { BorderCardDirective } from '../border-card.directive';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-pokemon-form',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgStyle,
    BorderCardDirective,
    FormsModule,
    PokemonTypeColorPipe,
    LoaderComponent,
  ],
  templateUrl: './pokemon-form.component.html',
  styleUrl: './pokemon-form.component.scss',
})
export class PokemonFormComponent implements OnInit {
  @Input() pokemon: Pokemon;
  types: string[];
  isAddForm: boolean;

  constructor(private router: Router, private pokemonService: PokemonService) {}

  /**
   * Initializes the component with the list of Pokemon types and sets
   * a flag indicating if the form is for adding a new Pokemon.
   *
   */
  ngOnInit() {
    this.pokemonService
      .getPokemonTypesList()
      .subscribe((types) => (this.types = types));
    this.isAddForm = this.router.url.includes('add');
  }

  /**
   * Check if the pokemon has the specified type.
   *
   * @param {string} type - the type to check
   * @return {boolean} true if the pokemon has the specified type, false otherwise
   */
  hasType(type: string): boolean {
    return this.pokemon.types.includes(type);
  }

  /**
   * Selects or deselects a type based on the event and type provided.
   *
   * @param {Event} $event - the event triggering the selection
   * @param {string} type - the type to be selected or deselected
   */
  selectType($event: Event, type: string) {
    const isChecked: boolean = ($event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.pokemon.types.push(type);
    } else {
      const index = this.pokemon.types.indexOf(type);
      if (index >= 0) {
        this.pokemon.types.splice(index, 1);
      }
    }
  }

  /**
   * Checks if the given type is valid for the pokemon.
   *
   * @param {string} type - the type to be checked
   * @return {boolean} true if the type is valid, false otherwise
   */
  isTypesValid(type: string): boolean {
    if (this.pokemon.types.length === 1 && this.hasType(type)) {
      return false;
    }
    if (this.pokemon.types.length === 3 && !this.hasType(type)) {
      return false;
    }
    return true;
  }

  /**
   * Function to handle form submission, either adding a new pokemon or updating an existing one.
   *
   * @return {void}
   */
  onSubmit(): void {
    if (this.isAddForm) {
      this.pokemonService
        .addPokemon(this.pokemon)
        .subscribe((pokemon) =>
          this.router.navigate(['/pokemons', pokemon.name])
        );
    } else {
      this.pokemonService.updatePokemon(this.pokemon).subscribe(() => {
        this.router.navigate(['/pokemons', this.pokemon.name]);
      });
    }
  }

  /**
   * Navigates back to the previous URL if it contains 'edit',
   * otherwise navigates to the '/pokemons' URL.
   *
   * @return {void}
   */
  goBack(): void {
    const currentUrl = this.router.url.includes('edit');

    if (currentUrl) {
      this.router.navigate(['/pokemons/', this.pokemon.name]);
    } else {
      this.router.navigate(['/pokemons']);
    }
  }
}
