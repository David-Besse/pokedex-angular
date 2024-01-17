import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { POKEMONS } from './mock.pokemon-list';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  uri: string = 'http://localhost:3000/apipokemons';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  private log(response: Pokemon[] | Pokemon | string) {
    console.table(response);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: Pokemon | undefined | []): Observable<T> => {
      if (error) {
        console.error(error);
        this.log(`${operation} failed: ${error}`);
      }
      return of(result as T);
    };
  }

  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.uri).pipe(
      tap(() => this.log('fetched pokemons')),
      catchError(this.handleError('GET pokemons list failed', []))
    );
  }

  getPokemonById(pokemonId: number): Observable<Pokemon | undefined> {
    return this.http.get<Pokemon>(`${this.uri}/${pokemonId}`).pipe(
      tap(() => this.log(`fetched pokemon id=${pokemonId}`)),
      catchError(this.handleError('GET a pokemon by id failed', undefined))
    );
  }

  getPokemonByName(pokemonName: string): Observable<Pokemon[] | undefined> {
    return this.http.get<Pokemon[]>(`${this.uri}?name=${pokemonName}`).pipe(
      delay(500), // simulate server latency for educational purposes and to show loading component
      tap(() => this.log(`fetched pokemon name=${pokemonName}`)),
      catchError(this.handleError('GET a pokemon by name failed', undefined))
    );
  }

  getPokemonTypeList(): string[] {
    const types: string[] = [];
    POKEMONS.forEach((pokemon) => {
      types.push(...pokemon.types);
    });
    return [...new Set(types)];
  }

  updatePokemon(pokemon: Pokemon): Observable<Pokemon | undefined> {
    return this.http
      .put<Pokemon>(`${this.uri}/${pokemon.id}`, pokemon, this.httpOptions)
      .pipe(
        tap(() => this.log(`updated hero id=${pokemon.id}`)),
        catchError(this.handleError('UPDATE a pokemon failed', undefined))
      );
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    return this.http.post<Pokemon>(this.uri, pokemon, this.httpOptions).pipe(
      tap((newPokemon: Pokemon) =>
        this.log(`added hero w/ id=${newPokemon.id}`)
      ),
      catchError(this.handleError('ADD a pokemon failed', pokemon))
    );
  }

  deletePokemon(pokemonId: number): Observable<null> {
    return this.http
      .delete<null>(`${this.uri}/${pokemonId}`, this.httpOptions)
      .pipe(
        tap(() => this.log(`deleted pokemon id=${pokemonId}`)),
        catchError(this.handleError('DELETE a pokemon failed', null))
      );
  }

  searchPokemonByName(term: string): Observable<Pokemon[]> {
    if (!term.trim()) {
      return of([]);
    }

    const termTrimmed = term.trim();

    const searchList = this.http.get<Pokemon[]>(`${this.uri}`).pipe(
      tap(() => this.log(`found pokemons matching "${term}"`)),
      catchError(this.handleError('search pokemons failed', []))
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
