import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req || !next) {
    throw new Error('Null pointer exception in credentialsInterceptor.');
  }

  const modifiedRequest: HttpRequest<unknown> = req.clone({
    withCredentials: true,
    setHeaders: {
      'Access-Control-Allow-Origin': 'https://dbwd-pokedex.vercel.app',
    },
  });

  try {
    return next(modifiedRequest);
  } catch (error) {
    throw new Error(`Unhandled exception in credentialsInterceptor: ${error}`);
  }
};
