import { Routes } from '@angular/router';
import { PokemonService } from './pokemon.service';

const pokemonRoutes: Routes = [
  {
    path: '',
    providers: [PokemonService],
    children: [
      {
        path: 'edit/pokemon/:id',
        loadComponent: () =>
          import('./edit-pokemon/edit-pokemon.component'),
        // The component will not be found if it is not defined as a default export.
        // However, we can use a promise to import the module and retrieve the component, which gets around this limitation:
        // import('./edit-pokemon/edit-pokemon.component').then((m) => m.EditPokemonComponent)
      },
      {
        path: 'pokemon/add',
        title: 'Add a pokemon',
        loadComponent: () =>
          import('./add-pokemon/add-pokemon.component'),
      },
      {
        path: 'pokemons',
        title: 'Pokedex',
        loadComponent: () =>
          import('./list-pokemon/list-pokemon.component'),
      },
      {
        path: 'pokemon/:id',
        loadComponent: () =>
          import('./detail-pokemon/detail-pokemon.component'),
      },
    ],
  },
];

export default pokemonRoutes;