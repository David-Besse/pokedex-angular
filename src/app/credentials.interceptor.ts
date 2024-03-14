import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedRequest: HttpRequest<unknown> = req.clone({
    headers: req.headers.set(origin, 'https://dbwd-pokedex-api.vercel.app'),
    withCredentials: true,
  });
  return next(modifiedRequest);
};
