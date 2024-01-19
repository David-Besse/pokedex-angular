import {inject} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/service/auth.service';

export const guardianGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLogged) {
    return true;
  }

  // Redirect to the login page
  return router.parseUrl('/login');
};