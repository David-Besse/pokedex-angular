import { Routes } from '@angular/router';
import { ListPokemonComponent } from './list-pokemon/list-pokemon.component';
import { DetailPokemonComponent } from './detail-pokemon/detail-pokemon.component';

export const AppRoutes: Routes = [
  {
    path: 'pokemons',
    component: ListPokemonComponent,
  },
  {
    path: 'pokemons/:id',
    component: DetailPokemonComponent,
  },
  {
    path: '',
    redirectTo: 'pokemons',
    pathMatch: 'full',
  },
];
