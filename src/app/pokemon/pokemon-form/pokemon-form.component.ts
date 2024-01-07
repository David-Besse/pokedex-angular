import { CommonModule } from '@angular/common';
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
    CommonModule,
    BorderCardDirective,
    FormsModule,
    PokemonTypeColorPipe,
  ],
  templateUrl: './pokemon-form.component.html',
  styleUrl: './pokemon-form.component.scss',
})
export class PokemonFormComponent implements OnInit {
  @Input() pokemon: Pokemon;
  types: string[] = [];
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
    const isChecked = ($event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.pokemon.types.push(type);
    } else {
      const index = this.pokemon.types.indexOf(type);
      if (index >= 0) {
        this.pokemon.types.splice(index, 1);
      }
    }
  }

  onSubmit() {
    // if (this.isAddForm) {
    //   this.pokemonService
    //     .addPokemon(this.pokemon)
    //     .subscribe((pokemon: Pokemon) =>
    //       this.router.navigate(['/pokemon', pokemon.id])
    //     );
    // } else {
    //   this.pokemonService
    //     .updatePokemon(this.pokemon)
    //     .subscribe(() => this.router.navigate(['/pokemon', this.pokemon.id]));
    // }
    this.router.navigate(['/pokemon', this.pokemon.id]);
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
}
