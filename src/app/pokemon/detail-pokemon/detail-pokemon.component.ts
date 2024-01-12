import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor, NgStyle, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';
import { PokemonService } from '../pokemon.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-detail-pokemon',
  standalone: true,
  imports: [NgIf, NgFor, NgStyle, DatePipe, PokemonTypeColorPipe],
  templateUrl: './detail-pokemon.component.html',
  styleUrl: './detail-pokemon.component.scss',
})
export default class DetailPokemonComponent implements OnInit {
  pokemonList: Pokemon[];
  pokemonSelected: Pokemon | undefined;

  constructor(
    private currentRoute: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService,
    private titleService: Title
  ) {}

  ngOnInit() {
    const pokemonId = this.currentRoute.snapshot.paramMap.get('id');

    if (pokemonId) {
      this.pokemonService.getPokemonById(pokemonId).subscribe((pokemon) => {
        if (pokemon) {
          this.pokemonSelected = pokemon[0];
          this.initTitle(pokemon[0]);
        }
      });
    }
  }

  initTitle(pokemon: Pokemon | undefined) {
    if (!pokemon) {
      this.titleService.setTitle('Pokemon not found');
      return;
    }

    this.titleService.setTitle(pokemon.name);
  }

  goBack() {
    this.router.navigate(['/pokemons']);
  }

  goEdit(pokemon: Pokemon) {
    this.router.navigate([`/pokemons/${pokemon.id}/edit/`]);
  }

  goDelete(pokemonId: number) {
    this.pokemonService
      .deletePokemon(pokemonId)
      .subscribe(() => this.router.navigate(['/pokemons']));
  }
}
