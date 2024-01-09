import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { POKEMONS } from './mock.pokemon-list';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {

  urlApi = 'http://localhost:3000/pokemons';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  private log(response: Pokemon[] | Pokemon | string) {
    console.table(response);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.urlApi).pipe(
      tap(() => this.log('fetched pokemons')),
      catchError(this.handleError('GET pokemons', []))
    );
  }

  getPokemonById(pokemonId: number): Observable<Pokemon | undefined> {
    return this.http.get<Pokemon>(`${this.urlApi}?id=${pokemonId}`).pipe(
      tap(() => this.log(`fetched hero id=${pokemonId}`)),
      catchError(this.handleError('GET a pokemon by id', undefined))
    );
  }

  getPokemonByName(pokemonName: string): Observable<Pokemon | undefined> {
    return this.http.get<Pokemon>(`${this.urlApi}?name=${pokemonName}`).pipe(
      tap(() => this.log(`fetched hero name=${pokemonName}`)),
      catchError(this.handleError('GET a pokemon by name', undefined))
    );
  }

  getPokemonTypeList(): string[] {
    const types: string[] = [];
    POKEMONS.forEach((pokemon) => {
      types.push(...pokemon.types);
    });
    return [...new Set(types)];
  }

  updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
    return this.http
      .put<Pokemon>(`${this.urlApi}/${pokemon.id}`, pokemon, this.httpOptions)
      .pipe(
        tap(() => this.log(`updated hero id=${pokemon.id}`)),
        catchError(this.handleError<any>('UPDATE a pokemon', pokemon))
      );
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    return this.http
      .post<Pokemon>(`${this.urlApi}`, pokemon, this.httpOptions)
      .pipe(
        tap((newPokemon: Pokemon) =>
          this.log(`added hero w/ id=${newPokemon.id}`)
        ),
        catchError(this.handleError('ADD a pokemon', pokemon))
      );
  }

  deletePokemon(pokemon: Pokemon): Observable<Pokemon> {
    return this.http
      .delete<Pokemon>(`${this.urlApi}/${pokemon}`, this.httpOptions)
      .pipe(
        tap(() => this.log(`deleted hero id=${pokemon.id}`)),
        catchError(this.handleError('DELETE a pokemon', pokemon))
      );
  }
}
