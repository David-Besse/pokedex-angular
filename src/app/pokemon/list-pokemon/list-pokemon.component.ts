// This class definition is a component for listing Pokemon.

import {
  AfterViewInit,
  // ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
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
import { BrowserSessionStorageService } from '../../browser-storage.service';

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
export default class ListPokemonComponent implements OnInit, AfterViewInit {
  pokemonList: Pokemon[] | [];
  lsInformationBox: string | null;

  constructor(
    private pokemonService: PokemonService,
    private informationBoxService: InformationBoxService,
    private sessionStorageService: BrowserSessionStorageService,
    // private cd: ChangeDetectorRef
  ) {}

  /**
   * Initialize the component with Pokemon list and information box data.
   *
   * @return {void}
   */
  ngOnInit(): void {
    this.pokemonService
      .getPokemonList()
      .subscribe((pokemonList: Pokemon[] | []) => {
        this.pokemonList = pokemonList;
      });
  }

  /**
   * ngAfterViewInit() function.
   * Sets up the information box and updates the change detector to avoid ExpressionChangedAfterItHasBeenCheckedError.
   *
   * @return {void}
   */
  ngAfterViewInit(): void {
    this.lsInformationBox = this.sessionStorageService.get('informationBox');
    if (this.lsInformationBox !== 'viewed') {
      setTimeout(() => {
        this.informationBoxService.open(
          'Welcome ! This project is a demo for learning purposes. It is not intended to be used in production.'
        );
        this.sessionStorageService.set('informationBox', 'viewed');
      }, 200);
    }

    //! Keep it commented for knowledge purposes.
    //! To avoid ExpressionChangedAfterItHasBeenCheckedError when detecting changes
    //! workaround: add a setTimeout() in the ngAfterViewInit()
    // this.cd.detectChanges();
  }
}
