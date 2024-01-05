import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { POKEMONS } from '../mock.pokemon-list';
import { Pokemon } from '../pokemon';
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

  constructor(private selectedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.pokemonList = POKEMONS;
    
    const pokemonId: string|null = this.selectedRoute.snapshot.paramMap.get('id');
    
    if (pokemonId) {
      console.log(pokemonId);
      this.pokemonSelected = this.pokemonList.find(pokemon => pokemon.id === +pokemonId);
    }
  }

  goBack() {
    this.router.navigate(['/pokemons']);
  }
}
