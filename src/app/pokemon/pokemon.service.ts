// This class is a service for managing Pokémon data. Here's what each method does:
// getPokemonList(): Retrieves a list of Pokémon.
// getPokemonById(pokemonId): Retrieves a Pokémon by its ID.
// getPokemonByName(pokemonName): Retrieves a Pokémon by its name.
// getPokemonTypesList(): Retrieves a list of Pokémon types.
// updatePokemon(pokemon): Updates a Pokémon's information.
// addPokemon(pokemon): Adds a new Pokémon.
// deletePokemon(pokemonId): Deletes a Pokémon.

import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap, throwError } from 'rxjs';
import { LoginService } from '../auth/login/login.service';
import { MinimizedLoginService } from '../auth/login/minimized-login/minimized-login.service';
import { InformationBoxService } from '../information-box/service/information-box.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  uri: string = 'https://dbwd-pokedex-api.vercel.app/api/pokemons';
  httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };

  constructor(
    private http: HttpClient,
    private readonly loginService: LoginService,
    private readonly minimizedLoginService: MinimizedLoginService,
    private readonly informationBoxService: InformationBoxService
  ) {}

  /**
   * Logs the given response using console.table.
   *
   * @param {Pokemon[] | Pokemon | string} response - The response to be logged
   * @return {void}
   */
  private log(response: Pokemon[] | Pokemon | string): void {
    console.table(response);
  }

  /**
   * Handles the error response from the HTTP request.
   *
   * @param {HttpErrorResponse} error - the error response from the HTTP request
   * @return {Observable<never>} an observable that emits an error
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 403 || error.status === 401) {
      this.minimizedLoginService.isLoginMinimizedDisplayed.next(false);
      this.loginService.handleLogout();
    }

    setTimeout(() => {
      this.informationBoxService.open(
        'An internal error occurred. Please reconnect.'
      );
    }, 100);

    return throwError(() => error);
  }

  /**
   * Retrieves a list of pokemons from the server.
   *
   * @return {Observable<Pokemon[]>} an observable of the list of pokemons
   */
  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.uri, this.httpOptions).pipe(
      tap(() => this.log('fetched pokemons')),
      catchError((error) => this.handleError(error))
    );
  }

  /**
   * Get a Pokemon by its ID.
   *
   * @param {number} pokemonId - The ID of the Pokemon to retrieve.
   * @return {Observable<Pokemon | undefined>} An observable of the Pokemon or undefined.
   */
  getPokemonById(pokemonId: string): Observable<Pokemon | undefined> {
    return this.http
      .get<Pokemon>(`${this.uri}/${pokemonId}`, this.httpOptions)
      .pipe(
        delay(500), // simulate server latency for educational purposes and to show loading component
        tap(() => this.log(`fetched pokemon id=${pokemonId}`)),
        catchError((error) => this.handleError(error))
      );
  }

  /**
   * Retrieves a Pokemon by name using the specified `pokemonName`.
   *
   * @param {string} pokemonName - The name of the Pokemon to retrieve.
   * @return {Observable<Pokemon[] | undefined>} An observable of Pokemon array or undefined.
   */
  getPokemonByName(pokemonName: string): Observable<Pokemon[] | undefined> {
    return this.http.get<Pokemon[]>(`${this.uri}?name=${pokemonName}`).pipe(
      delay(500), // simulate server latency for educational purposes and to show loading component
      tap(() => this.log(`fetched pokemon name=${pokemonName}`)),
      catchError((error) => this.handleError(error))
    );
  }

  /**
   * Retrieves a list of Pokemon types from the server.
   *
   * @return {Observable<string[]>} Observable of string array containing Pokemon types
   */
  getPokemonTypesList(): Observable<string[]> {
    // Send an HTTP GET request to the specified URI to fetch a list of Pokemon data
    return this.http.get<Pokemon[]>(this.uri, this.httpOptions).pipe(
      // Log a message to the console indicating that the Pokemon list is being fetched to get types
      tap(() => this.log('fetched pokemons list to get types')),
      // Handle any errors that may occur during the HTTP GET request, returning an empty array in case of failure
      catchError((error) => this.handleError(error)),
      // Map the retrieved Pokemon list to extract the types of each Pokemon and flatten the resulting array
      map((pokemonsList) => pokemonsList.flatMap((pokemon) => pokemon.types)),
      // Convert the array of types to a set to remove duplicates, then convert it back to an array and return it
      map((types) => [...new Set(types)] as string[])
    );
  }

  /**
   * Update a Pokemon.
   *
   * @param {Pokemon} pokemon - The Pokemon to update
   * @return {Observable<Pokemon | undefined>} The updated Pokemon, or undefined if the update failed
   */
  updatePokemon(pokemon: Pokemon): Observable<Pokemon | undefined> {
    return this.http
      .put<Pokemon>(`${this.uri}/${pokemon.id}`, pokemon, this.httpOptions)
      .pipe(
        tap(() => this.log(`updated hero id=${pokemon.id}`)),
        catchError((error) => this.handleError(error))
      );
  }

  /**
   * Adds a new Pokemon to the database.
   *
   * @param {Pokemon} pokemon - the Pokemon to be added
   * @return {Observable<Pokemon>} an observable of the added Pokemon
   */
  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    return this.http.post<Pokemon>(this.uri, pokemon, this.httpOptions).pipe(
      tap((newPokemon: Pokemon) =>
        this.log(`added hero w/ id=${newPokemon.id}`)
      ),
      catchError((error) => this.handleError(error))
    );
  }

  /**
   * Delete a pokemon by its ID.
   *
   * @param {number} pokemonId - The ID of the pokemon to be deleted
   * @return {Observable<null>} An observable of null
   */
  deletePokemon(pokemonId: number): Observable<null> {
    return this.http
      .delete<null>(`${this.uri}/${pokemonId}`, this.httpOptions)
      .pipe(
        tap(() => this.log(`deleted pokemon id=${pokemonId}`)),
        catchError((error) => this.handleError(error))
      );
  }

  /**
   * Search for pokemons by name.
   *
   * @param {string} term - The name of the pokemon to search for
   * @return {Observable<Pokemon[]>} An observable of pokemons matching the search term
   */
  searchPokemonByName(term: string): Observable<Pokemon[]> {
    if (!term.trim()) {
      return of([]);
    }

    const termTrimmed = term.trim();

    const searchList = this.http
      .get<Pokemon[]>(`${this.uri}`, this.httpOptions)
      .pipe(
        tap(() => this.log(`found pokemons matching "${term}"`)),
        catchError((error) => this.handleError(error))
      );

    return searchList.pipe(
      map((pokemons) => {
        return pokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(termTrimmed.toLowerCase())
        );
      })
    );
  }
}
