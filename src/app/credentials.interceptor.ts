import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req || !next) {
    throw new Error('Null pointer exception in credentialsInterceptor.');
  }

  const modifiedRequest: HttpRequest<unknown> = req.clone({
    setHeaders: {
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });

  try {
    return next(modifiedRequest);
  } catch (error) {
    throw new Error(`Unhandled exception in credentialsInterceptor: ${error}`);
  }
};
