import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-detail-pokemon',
  standalone: true,
  imports: [CommonModule, PokemonTypeColorPipe],
  templateUrl: './detail-pokemon.component.html',
  styleUrl: './detail-pokemon.component.scss',
})
export class DetailPokemonComponent implements OnInit {
  pokemonList: Pokemon[];
  pokemonSelected: Pokemon | undefined;

  constructor(
    private selectedRoute: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    const pokemonId: string | null =
      this.selectedRoute.snapshot.paramMap.get('id');

    if (pokemonId) {
      this.pokemonSelected = this.pokemonService.getPokemonById(+pokemonId);
    }
  }

  goBack() {
    this.router.navigate(['/pokemons']);
  }

  goEdit(pokemon: Pokemon) {
    this.router.navigate(['/edit/pokemon', pokemon.id]);
  }
}
