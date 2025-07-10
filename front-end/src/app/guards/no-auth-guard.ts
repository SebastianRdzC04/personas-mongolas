import { CanActivateFn } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const http = inject(HttpClient);

  return http.get('http://localhost:3333/me').pipe(
    map(() => {
      // User is authenticated, prevent access and redirect to home or dashboard
      router.navigate(['/']);
      return false;
    }),
    catchError(() => {
      // User is NOT authenticated, allow access
      return of(true);
    })
  );
};
