// This TypeScript class definition is for a component called DetailPokemonComponent.
// ngOnInit(): Initializes the component by retrieving the Pokemon name from the current route and fetching the corresponding Pokemon information. Updates the selected Pokemon and initializes the title if the Pokemon is found.
// ngAfterViewInit(): is a lifecycle hook that is called after Angular has fully initialized a component's view.
// initTitle(pokemon: Pokemon | undefined): Initializes the title based on the provided Pokemon.
// goBack(): Navigates back to the previous '/pokemons/' route.
// goEdit(pokemon: Pokemon): Navigates to the edit page for a specific pokemon.
// goDelete(pokemon: Pokemon): Deletes a pokemon using the provided pokemon object.

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgIf, NgFor, NgStyle, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';
import { PokemonService } from '../pokemon.service';
import { Title } from '@angular/platform-browser';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-detail-pokemon',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgStyle,
    DatePipe,
    PokemonTypeColorPipe,
    LoaderComponent,
  ],
  templateUrl: './detail-pokemon.component.html',
})
export default class DetailPokemonComponent implements OnInit, AfterViewInit {
  pokemonList: Pokemon[];
  pokemonSelected: Pokemon | undefined;

  constructor(
    private currentRoute: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService,
    private titleService: Title
  ) {}

  /**
   * Initializes the component by retrieving the Pokemon name from the current route
   * and fetching the corresponding Pokemon information. Updates the selected Pokemon
   * and initializes the title if the Pokemon is found.
   *
   * @return {void}
   */
  ngOnInit(): void {
    const pokemonName: string | null =
      this.currentRoute?.snapshot?.paramMap?.get('name');

    if (pokemonName) {
      this.pokemonService.getPokemonByName(pokemonName).subscribe((pokemon) => {
        if (pokemon) {
          this.pokemonSelected = pokemon[0];
          this.initTitle(pokemon[0]);
        }
      });
    }
  }

  /**
   * ngAfterViewInit() is a lifecycle hook that is called after Angular has fully initialized a component's view.
   */
  ngAfterViewInit() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  /**
   * Initializes the title based on the provided Pokemon.
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

  /**
   * Navigates back to the previous '/pokemons/' route.
   *
   */
  goBack() {
    this.router.navigate(['/pokemons/']);
  }

  /**
   * Navigates to the edit page for a specific pokemon.
   *
   * @param {Pokemon} pokemon - the pokemon to be edited
   */
  goEdit(pokemon: Pokemon) {
    this.router.navigate([`/pokemons/edit/${pokemon.name}`]);
  }

  /**
   * Deletes a pokemon using the provided pokemon object.
   *
   * @param {Pokemon} pokemon - the pokemon object to be deleted
   * @return {void}
   */
  goDelete(pokemon: Pokemon): void {
    this.pokemonService
      .deletePokemon(pokemon.id)
      .subscribe(() => this.router.navigate(['/pokemons']));
  }
}
