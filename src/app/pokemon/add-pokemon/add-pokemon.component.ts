import { Component, OnInit } from '@angular/core';
import { PokemonFormComponent } from '../pokemon-form/pokemon-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-pokemon',
  standalone: true,
  imports: [PokemonFormComponent, CommonModule],
  templateUrl: './add-pokemon.component.html',
  styleUrl: './add-pokemon.component.scss',
})
export class AddPokemonComponent implements OnInit {
  constructor() {}

  ngOnInit(){
    console.log('add pokemon');
  }
}
