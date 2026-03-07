import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="admin-layout">
      <!-- Sidebar -->
      <aside class="admin-sidebar">
        <div class="sidebar-brand">
          <div class="brand-name">EDO Ingeniería Digital</div>
          <div class="brand-sub">Panel Administrativo</div>
        </div>

        <nav class="sidebar-nav">
          <a routerLink="proyectos" routerLinkActive="active" class="nav-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
            Proyectos
          </a>
          <a routerLink="blog" routerLinkActive="active" class="nav-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            Blog
          </a>
          <a routerLink="mensajes" routerLinkActive="active" class="nav-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
            Mensajes
          </a>
        </nav>

        <div class="sidebar-footer">
          <a routerLink="/" class="sidebar-action">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
            </svg>
            Ver sitio público
          </a>
          <button (click)="logout()" class="sidebar-action logout-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
              <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Cerrar sesión
          </button>
        </div>
      </aside>

      <!-- Main content -->
      <main class="admin-main">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .admin-layout { display: flex; min-height: 100vh; }
    .admin-sidebar {
      width: 240px; background: #0F2E5A;
      display: flex; flex-direction: column;
      position: fixed; top:0; left:0; bottom:0; z-index:100;
    }
    .sidebar-brand {
      padding: 24px 20px;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .brand-name { font-size: 14px; font-weight: 800; color: #fff; }
    .brand-sub  { font-size: 11px; color: rgba(255,255,255,0.35); margin-top: 2px; }
    .sidebar-nav { flex: 1; padding: 16px 12px; }
    .nav-item {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 14px; border-radius: 10px; margin-bottom: 4px;
      color: rgba(255,255,255,0.5); font-size: 14px; font-weight: 600;
      text-decoration: none; transition: all 0.2s;
      &:hover { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.8); }
      &.active { background: rgba(0,194,255,0.12); color: #00C2FF; border: 1px solid rgba(0,194,255,0.2); }
    }
    .sidebar-footer {
      padding: 16px 12px;
      border-top: 1px solid rgba(255,255,255,0.08);
      display: flex; flex-direction: column; gap: 6px;
    }
    .sidebar-action {
      display: flex; align-items: center; gap: 8px;
      padding: 9px 14px; border-radius: 8px;
      color: rgba(255,255,255,0.35); font-size: 13px;
      text-decoration: none; background: none; border: none;
      cursor: pointer; font-family: 'Outfit', sans-serif;
      transition: color 0.2s; width: 100%;
      &:hover { color: rgba(255,255,255,0.7); }
    }
    .logout-btn { &:hover { color: #FC8181; } }
    .admin-main { margin-left: 240px; flex: 1; padding: 36px; background: #F7F9FC; min-height: 100vh; }
  `],
})
export class DashboardComponent {
  private auth   = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.auth.logout();
  }
}
