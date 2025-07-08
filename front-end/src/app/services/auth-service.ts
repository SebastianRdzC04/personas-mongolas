import { Injectable } from '@angular/core';
import { loginModel, registerModel } from '../models/auth.model'; // Adjust the import path as necessary
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3333/';

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: loginModel): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}login`, credentials)
      .pipe(
        tap(response => {
          // Store token in localStorage
          localStorage.setItem('token', response.token.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
