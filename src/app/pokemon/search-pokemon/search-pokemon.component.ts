// This class definition is for the SearchPokemonComponent component. Here's a list of what each method does:
// ngOnInit(): Initializes the component, setting up the observable for search terms and fetching the data from the service.
// search(term: string): Updates the search terms for the component.
// goToDetail(pokemon: Pokemon): Navigates to the detail page for a specific Pokemon.

import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  map,
  shareReplay,
  switchMap,
} from 'rxjs';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, FormsModule],
  templateUrl: './search-pokemon.component.html',
})
export class SearchPokemonComponent implements OnInit {
  defaultInput: string;
  searchTerms = new Subject<string>();
  pokemons$: Observable<Pokemon[] | undefined>;

  constructor(private router: Router, private pokemonService: PokemonService) {}

  /**
   * Initializes the component and sets up the observable to search for pokemons
   * based on the search terms entered by the user.
   *
   * @return {void}
   */
  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => this.pokemonService.searchPokemonByName(term)),
      map((pokemons) => (pokemons.length > 0 ? pokemons : undefined)),
      shareReplay(1)
    );
  }

  /**
   * Handles the search functionality.
   *
   * @param {string} term - The search term
   * @return {void}
   */
  search(term: string): void {
    this.searchTerms.next(term);
  }

  /**
   * Navigates to the detail page of the given Pokemon.
   *
   * @param {Pokemon} pokemon - the Pokemon object
   * @return {void}
   */
  goToDetail(pokemon: Pokemon): void {
    const link = ['/pokemons', pokemon.name];
    this.router.navigate(link);
  }
}
