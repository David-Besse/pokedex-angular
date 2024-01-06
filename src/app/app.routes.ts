import { Routes } from '@angular/router';
import { ListPokemonComponent } from './pokemon/list-pokemon/list-pokemon.component';
import { DetailPokemonComponent } from './pokemon/detail-pokemon/detail-pokemon.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditPokemonComponent } from './pokemon/edit-pokemon/edit-pokemon.component';

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
    path: 'edit/pokemon/:id',
    component: EditPokemonComponent,
  },
  {
    path: '',
    redirectTo: 'pokemons',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
