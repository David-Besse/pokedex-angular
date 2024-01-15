import { NgIf, NgFor, NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { BorderCardDirective } from '../border-card.directive';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';

@Component({
  selector: 'app-pokemon-form',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgStyle,
    BorderCardDirective,
    FormsModule,
    PokemonTypeColorPipe,
  ],
  templateUrl: './pokemon-form.component.html',
  styleUrl: './pokemon-form.component.scss',
})
export class PokemonFormComponent implements OnInit {
  @Input() pokemon: Pokemon;
  types: string[];
  isAddForm: boolean;

  constructor(private router: Router, private pokemonService: PokemonService) {}

  ngOnInit() {
    this.types = this.pokemonService.getPokemonTypeList();
    this.isAddForm = this.router.url.includes('add');
  }

  hasType(type: string): boolean {
    return this.pokemon.types.includes(type);
  }

  selectType($event: Event, type: string) {
    const isChecked: boolean = ($event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.pokemon.types.push(type);
    } else {
      const index = this.pokemon.types.indexOf(type);
      if (index >= 0) {
        this.pokemon.types.splice(index, 1);
      }
    }
  }

  isTypesValid(type: string): boolean {
    if (this.pokemon.types.length === 1 && this.hasType(type)) {
      return false;
    }
    if (this.pokemon.types.length === 3 && !this.hasType(type)) {
      return false;
    }
    return true;
  }

  onSubmit() {
    if (this.isAddForm) {
      this.pokemonService
        .addPokemon(this.pokemon)
        .subscribe((pokemon) =>
          this.router.navigate(['/pokemons', pokemon.name])
        );
    } else {
      this.pokemonService.updatePokemon(this.pokemon).subscribe(() => {
        this.router.navigate(['/pokemons', this.pokemon.name]);
      });
    }
  }

  goBack() {
    const currentUrl = this.router.url.includes('edit');
    
    if (currentUrl) {
      this.router.navigate(['/pokemons/', this.pokemon.name]);
    } else {
      this.router.navigate(['/pokemons']);
    }
  }
}
