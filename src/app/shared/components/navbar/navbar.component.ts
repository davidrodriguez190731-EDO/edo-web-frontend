import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav [class.scrolled]="scrolled" class="navbar">
      <div class="container nav-inner">
        <!-- Brand -->
        <a routerLink="/" class="nav-brand">
          <div class="brand-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F2E5A" stroke-width="2.5">
              <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
            </svg>
          </div>
          <div>
            <div class="brand-name">EDO</div>
            <div class="brand-sub">Ingeniería Digital</div>
          </div>
        </a>

        <!-- Links -->
        <div class="nav-links">
          <a routerLink="/"          routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="nav-link">Inicio</a>
          <a routerLink="/servicios" routerLinkActive="active" class="nav-link">Servicios</a>
          <a routerLink="/portafolio"routerLinkActive="active" class="nav-link">Portafolio</a>
          <a routerLink="/blog"      routerLinkActive="active" class="nav-link">Blog</a>
          <a routerLink="/contacto"  routerLinkActive="active" class="nav-link">Contacto</a>
        </div>

        <!-- CTA -->
        <div class="nav-right">
          <a *ngIf="auth.isLoggedIn()" routerLink="/admin" class="btn-admin">
            ⚙ Admin
          </a>
          <a *ngIf="!auth.isLoggedIn()" routerLink="/admin/login" class="btn-lock" title="Administrador">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
          </a>
          <a routerLink="/contacto" class="btn btn--primary">Hablemos →</a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed; top:0; left:0; right:0; z-index:200;
      background: transparent;
      transition: all 0.3s;
      &.scrolled {
        background: rgba(15,46,90,0.97);
        backdrop-filter: blur(16px);
        border-bottom: 1px solid rgba(255,255,255,0.08);
      }
    }
    .nav-inner {
      display: flex; align-items: center;
      justify-content: space-between;
      height: 68px;
    }
    .nav-brand {
      display: flex; align-items: center; gap: 10px;
      text-decoration: none;
      .brand-icon {
        width: 36px; height: 36px;
        background: #00C2FF; border-radius: 10px;
        display: flex; align-items: center; justify-content: center;
      }
      .brand-name { font-size: 16px; font-weight: 800; color: #fff; line-height: 1.1; }
      .brand-sub  { font-size: 10px; color: rgba(255,255,255,0.45); letter-spacing: 1px; text-transform: uppercase; }
    }
    .nav-links {
      display: flex; gap: 4px;
      .nav-link {
        padding: 8px 14px; border-radius: 8px;
        color: rgba(255,255,255,0.6); font-size: 14px; font-weight: 500;
        text-decoration: none; transition: all 0.2s;
        &:hover { color: #fff; background: rgba(255,255,255,0.06); }
        &.active { color: #00C2FF; background: rgba(0,194,255,0.1); }
      }
    }
    .nav-right {
      display: flex; align-items: center; gap: 10px;
    }
    .btn-admin {
      background: rgba(0,194,255,0.12); border: 1px solid rgba(0,194,255,0.2);
      border-radius: 8px; padding: 8px 14px;
      color: #00C2FF; font-size: 13px; font-weight: 700;
      text-decoration: none; transition: all 0.2s;
      &:hover { background: rgba(0,194,255,0.2); }
    }
    .btn-lock {
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 8px; padding: 9px;
      color: rgba(255,255,255,0.4);
      text-decoration: none; display: flex;
      transition: all 0.2s;
      &:hover { color: rgba(255,255,255,0.7); }
    }
  `],
})
export class NavbarComponent {
  auth = inject(AuthService);
  scrolled = false;

  @HostListener('window:scroll')
  onScroll() { this.scrolled = window.scrollY > 40; }
}
