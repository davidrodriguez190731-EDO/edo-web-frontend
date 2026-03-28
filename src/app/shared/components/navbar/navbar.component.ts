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
          <!-- Redes sociales desktop con colores de marca -->
          <div class="nav-socials">
            <a href="https://www.instagram.com/edoingenieriadigital" target="_blank" rel="noopener"
               class="nav-social nav-social--ig" aria-label="Instagram" title="Instagram">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@edo.ingenieria.di" target="_blank" rel="noopener"
               class="nav-social nav-social--tt" aria-label="TikTok" title="TikTok">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.18 8.18 0 004.77 1.52V6.82a4.84 4.84 0 01-1-.13z"/>
              </svg>
            </a>
          </div>
          <div class="nav-sep"></div>
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

        <!-- Redes sociales en menú móvil -->
        <div class="mobile-socials">
          <a href="https://www.instagram.com/edoingenieriadigital" target="_blank" rel="noopener"
             class="mobile-social mobile-social--ig" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            <span>Instagram</span>
          </a>
          <a href="https://www.tiktok.com/@edo.ingenieria.di" target="_blank" rel="noopener"
             class="mobile-social mobile-social--tt" aria-label="TikTok">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.18 8.18 0 004.77 1.52V6.82a4.84 4.84 0 01-1-.13z"/>
            </svg>
            <span>TikTok</span>
          </a>
        </div>

        <a *ngIf="auth.isLoggedIn()" routerLink="/admin" class="mobile-admin" (click)="closeMenu()">Panel Admin</a>
        <a *ngIf="!auth.isLoggedIn()" routerLink="/admin/login" class="mobile-admin-login" (click)="closeMenu()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
          </svg>
          Administrador
        </a>
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

    /* — Redes sociales desktop con colores de marca — */
    .nav-socials { display: flex; align-items: center; gap: 6px; }
    .nav-social {
      display: flex; align-items: center; justify-content: center;
      width: 30px; height: 30px; border-radius: 7px;
      text-decoration: none;
      transition: all 0.25s;
    }
    .nav-social:hover {
      transform: translateY(-2px);
    }

    /* Instagram navbar — gradiente de marca */
    .nav-social--ig {
      background: linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
      color: #fff;
      box-shadow: 0 1px 6px rgba(225,48,108,0.25);
    }
    .nav-social--ig:hover {
      box-shadow: 0 3px 12px rgba(225,48,108,0.45);
    }

    /* TikTok navbar — fondo negro con acento cyan */
    .nav-social--tt {
      background: #010101;
      color: #00f2ea;
      border: 1px solid rgba(0,242,234,0.25);
      box-shadow: 0 1px 6px rgba(0,0,0,0.2);
    }
    .nav-social--tt:hover {
      box-shadow: 0 3px 12px rgba(0,242,234,0.3);
      border-color: rgba(0,242,234,0.5);
    }

    .nav-sep {
      width: 1px; height: 20px;
      background: rgba(255,255,255,0.1);
    }

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

    /* — Redes sociales en menú móvil con colores de marca — */
    .mobile-socials {
      display: flex; gap: 8px; margin-top: 8px; padding: 0 4px;
    }
    .mobile-social {
      display: flex; align-items: center; gap: 8px; flex: 1;
      padding: 12px 14px; border-radius: 10px;
      font-size: 13px; font-weight: 600;
      text-decoration: none;
      transition: all 0.25s;
      justify-content: center;
    }
    .mobile-social:hover { transform: translateY(-1px); }

    .mobile-social--ig {
      background: linear-gradient(135deg, rgba(240,148,51,0.2), rgba(220,39,67,0.2));
      border: 1px solid rgba(220,39,67,0.3);
      color: #f09433;
    }
    .mobile-social--ig:hover {
      background: linear-gradient(135deg, rgba(240,148,51,0.3), rgba(220,39,67,0.3));
    }

    .mobile-social--tt {
      background: rgba(0,242,234,0.08);
      border: 1px solid rgba(0,242,234,0.2);
      color: #00f2ea;
    }
    .mobile-social--tt:hover {
      background: rgba(0,242,234,0.15);
    }

    .mobile-admin {
      margin-top: 8px; padding: 12px 16px; border-radius: 10px;
      background: rgba(0,194,255,0.1); border: 1px solid rgba(0,194,255,0.2);
      color: #00C2FF; font-size: 14px; font-weight: 700; text-align: center;
      text-decoration: none;
    }
    .mobile-admin-login {
      display: flex; align-items: center; gap: 8px;
      padding: 10px 16px; border-radius: 10px; margin-top: 4px;
      font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.35);
      text-decoration: none; transition: color 0.2s;
    }
    .mobile-admin-login:hover { color: rgba(255,255,255,0.6); }

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
