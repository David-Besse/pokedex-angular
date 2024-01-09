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
  pokemonSelected: Pokemon;

  constructor(
    private currentRoute: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService,
    private titleService: Title
  ) {}

  ngOnInit() {
    const pokemonId: string | null =
      this.currentRoute.snapshot.paramMap.get('id');
    10;

    if (pokemonId) {
      this.pokemonService.getPokemonById(+pokemonId).subscribe((pokemon) => {
        if (pokemon) {
          this.pokemonSelected = pokemon;
          console.log(this.pokemonSelected);
          this.initTitle(pokemon);
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
    this.router.navigate(['/edit/pokemon', pokemon.id]);
  }
}
