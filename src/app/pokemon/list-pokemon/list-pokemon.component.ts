import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor, NgStyle, DatePipe } from '@angular/common';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';
import { BorderCardDirective } from '../border-card.directive';
import { SearchPokemonComponent } from '../search-pokemon/search-pokemon.component';
import { LoaderComponent } from '../loader/loader.component';
import { InformationBoxService } from '../../information-box/service/information-box.service';
import { InformationBoxComponent } from '../../information-box/information-box.component';
import { BrowserStorageService } from '../../browser-storage.service';

@Component({
  selector: 'app-list-pokemon',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgStyle,
    DatePipe,
    PokemonTypeColorPipe,
    BorderCardDirective,
    RouterLink,
    SearchPokemonComponent,
    LoaderComponent,
    InformationBoxComponent,
  ],
  templateUrl: './list-pokemon.component.html',
  styleUrl: './list-pokemon.component.scss',
})
export default class ListPokemonComponent implements OnInit {
  pokemonList: Pokemon[] | [];

  constructor(
    private pokemonService: PokemonService,
    private informationBoxService: InformationBoxService,
    private browserStorage: BrowserStorageService
  ) {}

  ngOnInit(): void {
    this.pokemonService
      .getPokemonList()
      .subscribe((pokemonList: Pokemon[] | []) => {
        this.pokemonList = pokemonList;
      });

    const informationBox = this.browserStorage.get('informationBox_cookie');
    if (!informationBox) {
      this.informationBoxService.setText(
        'Welcome ! The server response time has been forced to 0.5s to display the loader in some cases (edit/detail).'
      );
      this.informationBoxService.toggleInformationBox = true;
    }
  }
}
