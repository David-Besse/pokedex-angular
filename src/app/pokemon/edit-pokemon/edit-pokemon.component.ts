import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { PokemonFormComponent } from '../pokemon-form/pokemon-form.component';
import { Pokemon } from '../pokemon';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-pokemon',
  standalone: true,
  imports: [NgIf, PokemonFormComponent],
  templateUrl: './edit-pokemon.component.html',
  styleUrl: './edit-pokemon.component.scss',
})
export default class EditPokemonComponent implements OnInit {
  pokemon: Pokemon | undefined;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private titleService: Title
  ) {}

  ngOnInit() {
    const pokemonName: string | null = this.route.snapshot.paramMap.get('name');

    if (pokemonName) {
      this.pokemonService.getPokemonByName(pokemonName).subscribe((pokemon) => {
        if (pokemon) {
          this.pokemon = pokemon[0];
          this.initTitle(pokemon[0]);
        }
      });
    } else {
      this.pokemon = undefined;
    }
  }

  private initTitle(pokemon: Pokemon | undefined) {
    if (!pokemon) {
      this.titleService.setTitle('Pokemon not found');
      return;
    }

    this.titleService.setTitle(pokemon.name);
  }
}
