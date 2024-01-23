import {inject} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/service/auth.service';

/**
 * Function to check if the user is logged in and redirect to the login page if not.
 *
 * @return {boolean | UrlTree} Returns true if the user is logged in, otherwise redirects to the login page.
 */
export const guardianGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLogged) {
    return true;
  }

  // Redirect to the login page
  return router.parseUrl('/login');
};