import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { POKEMONS } from './mock.pokemon-list';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  getPokemonList(): Pokemon[] {
    return POKEMONS;
  }

  getPokemonById(id: number): Pokemon | undefined {
    return POKEMONS.find((pokemon) => pokemon.id === id);
  }

  getPokemonByName(name: string): Pokemon | undefined {
    return POKEMONS.find((pokemon) => pokemon.name === name);
  }

  getPokemonTypeList(): string[] {
    const types: string[] = [];
    POKEMONS.forEach((pokemon) => {
      types.push(...pokemon.types);
    });
    return [...new Set(types)];
  }
}
