import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedRequest: HttpRequest<unknown> = req.clone({
    headers: req.headers.set('Access-Control-Allow-Credentials', 'true'),
    withCredentials: true,
  });
  return next(modifiedRequest);
};
