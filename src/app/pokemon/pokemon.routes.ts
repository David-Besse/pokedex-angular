// Pokemon routes

import { Routes } from '@angular/router';
import { PokemonService } from './pokemon.service';
import { guardianGuard } from '../guardian.guard';

const pokemonRoutes: Routes = [
  {
    path: '',
    providers: [PokemonService],
    canActivate: [guardianGuard],
    children: [
      {
        path: 'pokemons/edit/:name',
        loadComponent: () => import('./edit-pokemon/edit-pokemon.component'),
        //! IMPORTANT: The component will not be found if it is not defined as a default export.
        //* However, we can use a promise to import the module and retrieve the component, which gets around this limitation:
        //* import('./edit-pokemon/edit-pokemon.component').then((m) => m.EditPokemonComponent)
      },
      {
        path: 'pokemons/add',
        title: 'Add a pokemon',
        loadComponent: () => import('./add-pokemon/add-pokemon.component'),
      },
      {
        path: 'pokemons/:name',
        loadComponent: () =>
          import('./detail-pokemon/detail-pokemon.component'),
      },
      {
        path: 'pokemons',
        title: 'Pokedex',
        loadComponent: () => import('./list-pokemon/list-pokemon.component'),
      },
    ],
  },
];

export default pokemonRoutes;
