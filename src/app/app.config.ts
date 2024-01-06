import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { AppRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { PokemonService } from './pokemon/pokemon.service';
import { FormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(AppRoutes), provideClientHydration(), PokemonService, FormsModule],
};
