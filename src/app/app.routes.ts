import { Routes } from '@angular/router';
// import { AuthGuard } from './auth.guard';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'pokemons',
    pathMatch: 'full',
  },
  {
    path: '',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pokemon/pokemon.routes'),
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
