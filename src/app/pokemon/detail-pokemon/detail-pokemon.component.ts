import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgIf, NgFor, NgStyle, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';
import { PokemonService } from '../pokemon.service';
import { Title } from '@angular/platform-browser';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-detail-pokemon',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgStyle,
    DatePipe,
    PokemonTypeColorPipe,
    LoaderComponent,
  ],
  templateUrl: './detail-pokemon.component.html',
})
export default class DetailPokemonComponent implements OnInit, AfterViewInit {
  pokemonList: Pokemon[];
  pokemonSelected: Pokemon | undefined;

  constructor(
    private currentRoute: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService,
    private titleService: Title
  ) {}

  ngOnInit() {
    const pokemonName: string | null =
      this.currentRoute.snapshot.paramMap.get('name');

    if (pokemonName) {
      this.pokemonService.getPokemonByName(pokemonName).subscribe((pokemon) => {
        if (pokemon) {
          this.pokemonSelected = pokemon[0];
          this.initTitle(pokemon[0]);
        }
      });
    }
  }

  ngAfterViewInit() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  private initTitle(pokemon: Pokemon | undefined) {
    if (!pokemon) {
      this.titleService.setTitle('Pokemon not found');
      return;
    }
    this.titleService.setTitle(pokemon.name);
  }

  goBack() {
    this.router.navigate(['/pokemons/']);
  }

  goEdit(pokemon: Pokemon) {
    this.router.navigate([`/pokemons/edit/${pokemon.name}`]);
  }

  goDelete(pokemon: Pokemon) {
    this.pokemonService
      .deletePokemon(pokemon.id)
      .subscribe(() => this.router.navigate(['/pokemons']));
  }
}
