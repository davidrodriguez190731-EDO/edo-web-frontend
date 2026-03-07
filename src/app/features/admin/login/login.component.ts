import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-wrap">
      <div class="circuit-overlay"></div>

      <div class="login-card">
        <div class="login-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1B4B8A" stroke-width="2">
            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
          </svg>
        </div>

        <h2>Panel Administrativo</h2>
        <p class="login-sub">EDO Ingeniería Digital</p>

        <div class="form-group">
          <label>Usuario</label>
          <input type="text" [(ngModel)]="username" placeholder="admin" (keyup.enter)="login()" />
        </div>

        <div class="form-group">
          <label>Contraseña</label>
          <input type="password" [(ngModel)]="password" placeholder="••••••••" (keyup.enter)="login()" />
        </div>

        <div *ngIf="error" class="login-error">
          ⚠️ {{ error }}
        </div>

        <button (click)="login()" class="btn btn--blue" style="width:100%" [disabled]="loading">
          {{ loading ? 'Verificando...' : 'Ingresar →' }}
        </button>

        <div class="login-hint">Demo: admin / edo2025</div>
        <a routerLink="/" class="back-link">← Volver al sitio</a>
      </div>
    </div>
  `,
  styles: [`
    .login-wrap {
      min-height: 100vh;
      background: linear-gradient(135deg, #0F2E5A 0%, #1B4B8A 100%);
      display: flex; align-items: center; justify-content: center;
      padding: 24px; position: relative;
    }
    .login-card {
      background: #fff; border-radius: 24px; padding: 48px;
      width: 100%; max-width: 420px; position: relative; z-index: 1;
      box-shadow: 0 40px 80px rgba(15,46,90,0.35);
      animation: fadeUp 0.4s ease;
    }
    .login-icon {
      width: 56px; height: 56px;
      background: #EEF2F8; border-radius: 16px;
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 20px;
    }
    h2 { font-size: 24px; font-weight: 800; color: #0F2E5A; text-align: center; margin-bottom: 4px; letter-spacing: -0.5px; }
    .login-sub { text-align: center; color: #718096; font-size: 14px; margin-bottom: 28px; }
    .login-error {
      background: rgba(229,62,62,0.08); border: 1px solid rgba(229,62,62,0.2);
      border-radius: 8px; padding: 10px 14px; font-size: 13px; color: #E53E3E; margin-bottom: 16px;
    }
    .login-hint { text-align: center; font-size: 11px; color: #A0AEC0; margin-top: 14px; }
    .back-link {
      display: block; text-align: center; margin-top: 12px;
      font-size: 13px; color: #A0AEC0; text-decoration: none;
      &:hover { color: #1B4B8A; }
    }
    @keyframes fadeUp {
      from { opacity:0; transform:translateY(20px); }
      to   { opacity:1; transform:translateY(0); }
    }
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
