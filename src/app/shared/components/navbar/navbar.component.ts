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

        <a routerLink="/" class="nav-brand">
          <img src="assets/logo.webp" alt="EDO Ingenieria Digital" class="brand-logo">
          <div class="brand-text">
            <div class="brand-name">EDO</div>
            <div class="brand-sub">Ingenieria Digital</div>
          </div>
        </a>

        <!-- Links desktop -->
        <div class="nav-links">
          <a routerLink="/"           routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="nav-link">Inicio</a>
          <a routerLink="/servicios"  routerLinkActive="active" class="nav-link">Servicios</a>
          <a routerLink="/portafolio" routerLinkActive="active" class="nav-link">Proyectos</a>
          <a routerLink="/nosotros"   routerLinkActive="active" class="nav-link">Nosotros</a>
        </div>

        <!-- Right desktop -->
        <div class="nav-right">
          <div class="lang-toggle">
            <span class="lang-active">ES</span>
            <span class="lang-sep">|</span>
            <span class="lang-inactive">EN</span>
          </div>
          <a *ngIf="auth.isLoggedIn()" routerLink="/admin" class="btn-admin">Admin</a>
          <a *ngIf="!auth.isLoggedIn()" routerLink="/admin/login" class="btn-lock" title="Administrador">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
          </a>
          <a routerLink="/contacto" class="btn-contact">Contacto</a>
        </div>

        <!-- Hamburguesa -->
        <button class="hamburger" (click)="toggleMenu()" [class.open]="menuOpen" aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </nav>

    <!-- Menú móvil -->
    <div class="mobile-menu" [class.open]="menuOpen" (click)="closeMenu()">
      <div class="mobile-menu-inner" (click)="$event.stopPropagation()">
        <a routerLink="/"           routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="mobile-link" (click)="closeMenu()">Inicio</a>
        <a routerLink="/servicios"  routerLinkActive="active" class="mobile-link" (click)="closeMenu()">Servicios</a>
        <a routerLink="/portafolio" routerLinkActive="active" class="mobile-link" (click)="closeMenu()">Proyectos</a>
        <a routerLink="/nosotros"   routerLinkActive="active" class="mobile-link" (click)="closeMenu()">Nosotros</a>
        <div class="mobile-divider"></div>
        <a routerLink="/contacto" class="mobile-cta" (click)="closeMenu()">Contacto</a>
        <a *ngIf="auth.isLoggedIn()" routerLink="/admin" class="mobile-admin" (click)="closeMenu()">Admin</a>
      </div>
    </div>
  `,
  styles: [`
    .navbar {
      position: fixed; top: 0; left: 0; right: 0; z-index: 200;
      background: rgba(10, 25, 60, 0.75);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255,255,255,0.06);
      transition: all 0.3s;
    }
    .navbar.scrolled {
      background: rgba(10, 25, 60, 0.97);
      box-shadow: 0 2px 24px rgba(0,0,0,0.3);
    }
    .nav-inner {
      display: flex; align-items: center;
      justify-content: space-between; height: 70px;
    }
    .nav-brand {
      display: flex; align-items: center; gap: 10px;
      text-decoration: none; flex-shrink: 0;
    }
    .brand-logo { height: 42px; width: auto; object-fit: contain; }
    .brand-text { display: flex; flex-direction: column; line-height: 1.1; }
    .brand-name { font-size: 17px; font-weight: 900; color: #fff; letter-spacing: 0.5px; }
    .brand-sub  { font-size: 10px; color: rgba(255,255,255,0.4); letter-spacing: 1.5px; text-transform: uppercase; }

    /* Links desktop */
    .nav-links { display: flex; gap: 2px; }
    .nav-link {
      padding: 8px 15px; border-radius: 8px;
      color: rgba(255,255,255,0.7); font-size: 14px; font-weight: 500;
      text-decoration: none; transition: all 0.2s;
    }
    .nav-link:hover  { color: #fff; background: rgba(255,255,255,0.07); }
    .nav-link.active { color: #fff; font-weight: 700; border-bottom: 2px solid #00C2FF; border-radius: 0; padding-bottom: 6px; }

    .nav-right { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
    .lang-toggle { display: flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 600; }
    .lang-active   { color: #fff; }
    .lang-sep      { color: rgba(255,255,255,0.3); }
    .lang-inactive { color: rgba(255,255,255,0.4); cursor: pointer; }

    .btn-admin {
      background: rgba(0,194,255,0.12); border: 1px solid rgba(0,194,255,0.2);
      border-radius: 8px; padding: 8px 14px;
      color: #00C2FF; font-size: 13px; font-weight: 700;
      text-decoration: none; transition: all 0.2s;
    }
    .btn-lock {
      background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
      border-radius: 8px; padding: 9px; color: rgba(255,255,255,0.4);
      text-decoration: none; display: flex; transition: all 0.2s;
    }
    .btn-contact {
      background: #E87722; color: #fff;
      font-size: 14px; font-weight: 700;
      padding: 10px 22px; border-radius: 8px;
      text-decoration: none; transition: all 0.2s;
      box-shadow: 0 4px 14px rgba(232,119,34,0.35);
    }
    .btn-contact:hover { background: #d4681a; transform: translateY(-1px); }

    /* Hamburguesa */
    .hamburger {
      display: none; flex-direction: column; justify-content: center;
      gap: 5px; width: 40px; height: 40px;
      background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
      border-radius: 10px; cursor: pointer; padding: 8px;
    }
    .hamburger span {
      display: block; height: 2px; background: #fff; border-radius: 2px;
      transition: all 0.3s;
      transform-origin: center;
    }
    .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
    .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

    /* Menú móvil overlay */
    .mobile-menu {
      display: none; position: fixed; inset: 0; z-index: 199;
      background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);
      opacity: 0; pointer-events: none;
      transition: opacity 0.3s;
    }
    .mobile-menu.open {
      opacity: 1; pointer-events: all;
    }
    .mobile-menu-inner {
      position: absolute; top: 70px; left: 0; right: 0;
      background: rgba(10, 22, 50, 0.98);
      border-bottom: 1px solid rgba(255,255,255,0.08);
      padding: 16px 24px 28px;
      transform: translateY(-8px);
      transition: transform 0.3s;
      display: flex; flex-direction: column; gap: 4px;
    }
    .mobile-menu.open .mobile-menu-inner {
      transform: translateY(0);
    }
    .mobile-link {
      padding: 13px 16px; border-radius: 10px;
      color: rgba(255,255,255,0.75); font-size: 15px; font-weight: 600;
      text-decoration: none; transition: all 0.2s;
    }
    .mobile-link:hover  { background: rgba(255,255,255,0.07); color: #fff; }
    .mobile-link.active { color: #00C2FF; font-weight: 700; }
    .mobile-divider { height: 1px; background: rgba(255,255,255,0.08); margin: 8px 0; }
    .mobile-cta {
      margin-top: 4px; padding: 14px 16px; border-radius: 10px;
      background: #E87722; color: #fff;
      font-size: 15px; font-weight: 700; text-align: center;
      text-decoration: none; transition: all 0.2s;
    }
    .mobile-cta:hover { background: #d4681a; }
    .mobile-admin {
      margin-top: 8px; padding: 12px 16px; border-radius: 10px;
      background: rgba(0,194,255,0.1); border: 1px solid rgba(0,194,255,0.2);
      color: #00C2FF; font-size: 14px; font-weight: 700; text-align: center;
      text-decoration: none;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .nav-links  { display: none; }
      .nav-right  { display: none; }
      .hamburger  { display: flex; }
      .mobile-menu { display: block; }
    }
  `],
})
export class NavbarComponent {
  auth = inject(AuthService);
  scrolled = false;
  menuOpen = false;

  @HostListener('window:scroll')
  onScroll() { this.scrolled = window.scrollY > 40; }

  toggleMenu() { this.menuOpen = !this.menuOpen; }
  closeMenu()  { this.menuOpen = false; }
}
