import { CanActivateFn } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const http = inject(HttpClient);

  return http.get('http://localhost:3333/me').pipe(
    map(() => true),
    catchError(() => {
      router.navigate(['/auth']);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return of(false);
    })
  );
};
