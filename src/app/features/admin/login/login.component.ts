import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="login-wrap">
      <div class="bg-dots"></div>

      <div class="login-card">

        <!-- Logo -->
        <div class="login-brand">
          <img src="assets/logo.webp" alt="EDO Ingeniería Digital" class="login-logo">
          <div class="login-brand-text">
            <div class="login-brand-name">EDO Ingeniería Digital</div>
            <div class="login-brand-sub">Panel Administrativo</div>
          </div>
        </div>

        <div class="login-divider"></div>

        <!-- Campos -->
        <div class="form-group">
          <label>Usuario</label>
          <div class="input-wrap">
            <svg class="input-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            <input type="text" [(ngModel)]="username" placeholder="Ingrese su usuario" (keyup.enter)="login()" [class.has-error]="!!error" />
          </div>
        </div>

        <div class="form-group">
          <label>Contraseña</label>
          <div class="input-wrap">
            <svg class="input-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
            <input type="password" [(ngModel)]="password" placeholder="Ingrese su contraseña" (keyup.enter)="login()" [class.has-error]="!!error" />
          </div>
        </div>

        <div class="login-error" *ngIf="error">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {{ error }}
        </div>

        <button (click)="login()" class="btn-login" [disabled]="loading">
          <span *ngIf="!loading">Ingresar</span>
          <span *ngIf="loading" class="loading-row">
            <span class="spinner"></span> Verificando...
          </span>
        </button>

        <a routerLink="/" class="back-link">← Volver al sitio</a>
      </div>
    </div>
  `,
  styles: [`
    .login-wrap {
      min-height: 100vh;
      background: #0A1628;
      display: flex; align-items: center; justify-content: center;
      padding: 24px; position: relative; overflow: hidden;
    }

    /* Fondo de puntos sutil */
    .bg-dots {
      position: absolute; inset: 0;
      background-image: radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px);
      background-size: 28px 28px;
      pointer-events: none;
    }

    /* Card */
    .login-card {
      background: #0F2040;
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 20px;
      padding: 40px 44px;
      width: 100%; max-width: 400px;
      position: relative; z-index: 1;
      box-shadow: 0 32px 80px rgba(0,0,0,0.4);
      animation: fadeUp 0.35s ease;
    }

    /* Brand / Logo */
    .login-brand {
      display: flex; align-items: center; gap: 14px;
      margin-bottom: 28px;
    }
    .login-logo {
      height: 52px; width: auto;
      filter: drop-shadow(0 4px 12px rgba(232,119,34,0.3));
    }
    .login-brand-name {
      font-size: 15px; font-weight: 800; color: #fff; line-height: 1.2;
      letter-spacing: -0.3px;
    }
    .login-brand-sub {
      font-size: 11px; color: rgba(255,255,255,0.35);
      margin-top: 3px; letter-spacing: 0.5px;
    }

    .login-divider {
      height: 1px; background: rgba(255,255,255,0.07);
      margin-bottom: 28px;
    }

    /* Campos */
    .form-group {
      display: flex; flex-direction: column; gap: 6px;
      margin-bottom: 16px;
    }
    .form-group label {
      font-size: 12px; font-weight: 600;
      color: rgba(255,255,255,0.5); letter-spacing: 0.3px;
    }
    .input-wrap {
      position: relative; display: flex; align-items: center;
    }
    .input-icon {
      position: absolute; left: 12px;
      color: rgba(255,255,255,0.25); pointer-events: none;
    }
    input {
      width: 100%; padding: 11px 14px 11px 36px;
      background: rgba(255,255,255,0.05);
      border: 1.5px solid rgba(255,255,255,0.1);
      border-radius: 10px; color: #fff; font-size: 14px;
      font-family: inherit; box-sizing: border-box;
      transition: border-color 0.2s, background 0.2s;
      &::placeholder { color: rgba(255,255,255,0.2); }
      &:focus { outline: none; border-color: #E87722; background: rgba(255,255,255,0.08); }
      &.has-error { border-color: rgba(239,68,68,0.5); }
    }

    /* Error */
    .login-error {
      display: flex; align-items: center; gap: 8px;
      background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.2);
      border-radius: 8px; padding: 10px 14px;
      font-size: 13px; color: #FCA5A5; margin-bottom: 16px;
    }

    /* Botón */
    .btn-login {
      width: 100%; padding: 12px;
      background: #E87722; border: none; border-radius: 10px;
      color: #fff; font-size: 14px; font-weight: 700;
      font-family: inherit; cursor: pointer; margin-top: 4px;
      transition: background 0.2s, transform 0.1s;
      &:hover:not(:disabled) { background: #D4691A; transform: translateY(-1px); }
      &:active:not(:disabled) { transform: translateY(0); }
      &:disabled { opacity: 0.6; cursor: not-allowed; }
    }
    .loading-row { display: flex; align-items: center; justify-content: center; gap: 8px; }
    .spinner {
      width: 14px; height: 14px; border-radius: 50%;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: #fff;
      animation: spin 0.7s linear infinite;
    }

    /* Volver */
    .back-link {
      display: block; text-align: center; margin-top: 18px;
      font-size: 12px; color: rgba(255,255,255,0.25);
      text-decoration: none; transition: color 0.2s;
      &:hover { color: rgba(255,255,255,0.6); }
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  `],
})
export class LoginComponent {
  private auth   = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';
  error    = '';
  loading  = false;

  login() {
    if (!this.username || !this.password) {
      this.error = 'Ingrese usuario y contraseña.';
      return;
    }
    this.loading = true;
    this.error   = '';
    this.auth.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/admin']),
      error: () => {
        this.error   = 'Credenciales incorrectas. Intente de nuevo.';
        this.loading = false;
      },
    });
  }
}
