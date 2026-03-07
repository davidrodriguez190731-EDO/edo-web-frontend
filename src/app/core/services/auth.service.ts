import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api    = inject(ApiService);
  private router = inject(Router);

  isLoggedIn = signal<boolean>(!!localStorage.getItem('edo_token'));
  currentUser = signal<any>(null);

  login(username: string, password: string) {
    return this.api.login(username, password).pipe(
      tap((res: any) => {
        localStorage.setItem('edo_token', res.token);
        this.isLoggedIn.set(true);
        this.currentUser.set(res.user);
      })
    );
  }

  logout() {
    localStorage.removeItem('edo_token');
    this.isLoggedIn.set(false);
    this.currentUser.set(null);
    this.router.navigate(['/']);
  }

  hasToken(): boolean {
    return !!localStorage.getItem('edo_token');
  }
}
