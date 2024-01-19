import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'pokemons',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () => import('./pokemon/pokemon.routes'),
  },
  {
    path: 'login',
    title: 'Login',
    loadComponent: () => import('./auth/login/login.component'),
  },
  {
    path: '**',
    title: 'Page not found',
    loadComponent: () =>
      import('./page-not-found/page-not-found.component').then(
        (m) => m.PageNotFoundComponent
      ),
  },
];
