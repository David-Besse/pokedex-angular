import { HttpInterceptorFn } from '@angular/common/http';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req || !next) {
    throw new Error('Null pointer exception in credentialsInterceptor.');
  }

  const modifiedRequest = req.clone({
    withCredentials: true,
  });

  try {
    return next(modifiedRequest);
  } catch (error) {
    throw new Error(`Unhandled exception in credentialsInterceptor: ${error}`);
  }
};
