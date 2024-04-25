import { HttpInterceptorFn } from '@angular/common/http';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req || !next) {
    throw new Error('Null pointer exception in credentialsInterceptor.');
  }

  const token: string | null = sessionStorage.getItem('pokedex_token');

  if (req.method !== 'GET' && token) {
    return next(
      req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      })
    );
  }

  return next(req);
};
