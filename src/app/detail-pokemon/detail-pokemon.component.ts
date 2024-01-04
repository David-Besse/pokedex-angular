import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { POKEMONS } from '../models/mock.pokemon-list';
import { Pokemon } from '../models/pokemon';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';

@Component({
  selector: 'app-detail-pokemon',
  standalone: true,
  imports: [ CommonModule, PokemonTypeColorPipe ],
  templateUrl: './detail-pokemon.component.html',
  styleUrl: './detail-pokemon.component.scss',
})
export class DetailPokemonComponent implements OnInit {

  pokemonList: Pokemon[];
  pokemonSelected: Pokemon|undefined;

  constructor(private router: ActivatedRoute) {}

  ngOnInit() {
    this.pokemonList = POKEMONS;
    const pokemonId: string|null = this.router.snapshot.paramMap.get('id');
    
    if (pokemonId) {
      console.log(pokemonId);
      this.pokemonSelected = this.pokemonList.find(pokemon => pokemon.id === +pokemonId);
    }
  }
}
