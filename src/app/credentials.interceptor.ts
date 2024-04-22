import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req || !next) {
    throw new Error('Null pointer exception in credentialsInterceptor.');
  }

  const modifiedRequest = req.clone({
    withCredentials: true,
  });

  return next(modifiedRequest).pipe(
    catchError((error) => {
      const { status } = error;

      if (error instanceof Error) {
        if (status === 401) {
          console.error('Unauthorized request:', error);
        } else {
          console.error('HTTP error:', error);
        }
      } else {
        console.error('Unknown error:', error);
      }
      return throwError(() => error);
    })
  );
};
