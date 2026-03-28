import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="site-footer">
      <div class="footer-glow"></div>
      <div class="container footer-inner">

        <!-- Col 1: Brand + redes -->
        <div class="footer-col footer-col--brand">
          <div class="footer-brand">
            <img src="assets/logo.webp" alt="EDO" class="footer-logo">
            <div>
              <div class="footer-brand-name">EDO Ingenier&#237;a Digital</div>
              <div class="footer-brand-sub">Monter&#237;a, C&#243;rdoba &#183; Colombia</div>
            </div>
          </div>
          <p class="footer-tagline">Sistemas a la medida que transforman la operaci&#243;n de su empresa.</p>
          <div class="footer-socials">
            <a *ngIf="socials.instagram" [href]="socials.instagram" target="_blank" rel="noopener"
               class="social-link social-link--ig" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a *ngIf="socials.tiktok" [href]="socials.tiktok" target="_blank" rel="noopener"
               class="social-link social-link--tt" aria-label="TikTok">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.18 8.18 0 004.77 1.52V6.82a4.84 4.84 0 01-1-.13z"/>
              </svg>
            </a>
            <a href="https://wa.me/573205554295" target="_blank" rel="noopener"
               class="social-link social-link--wa" aria-label="WhatsApp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Col 2: Navegaci&#243;n -->
        <div class="footer-col">
          <div class="footer-heading">
            <svg class="fh-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
            Navegaci&#243;n
          </div>
          <div class="footer-heading-line footer-heading-line--cyan"></div>
          <nav class="footer-nav">
            <a routerLink="/">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              Inicio
            </a>
            <a routerLink="/servicios">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              Servicios
            </a>
            <a routerLink="/portafolio">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              Proyectos
            </a>
            <a routerLink="/nosotros">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              Nosotros
            </a>
            <a routerLink="/blog">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              Blog
            </a>
          </nav>
        </div>

        <!-- Col 3: Servicios -->
        <div class="footer-col">
          <div class="footer-heading">
            <svg class="fh-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
            Servicios
          </div>
          <div class="footer-heading-line footer-heading-line--orange"></div>
          <nav class="footer-nav">
            <a routerLink="/servicios">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              Sistemas a la medida
            </a>
            <a routerLink="/servicios">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              Apps m&#243;viles (PWA)
            </a>
            <a routerLink="/servicios">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              Plataformas web
            </a>
            <a routerLink="/servicios">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              Sitios profesionales
            </a>
          </nav>
        </div>

        <!-- Col 4: Contacto -->
        <div class="footer-col">
          <div class="footer-heading">
            <svg class="fh-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
            Contacto
          </div>
          <div class="footer-heading-line footer-heading-line--green"></div>
          <div class="footer-contact">
            <a class="footer-contact-item footer-contact-item--hover" href="https://maps.google.com/?q=Monteria+Cordoba+Colombia" target="_blank">
              <div class="fci-icon fci-icon--red">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <div class="fci-label">Ubicaci&#243;n</div>
                <div class="fci-value">Monter&#237;a, C&#243;rdoba</div>
              </div>
            </a>
            <a class="footer-contact-item footer-contact-item--hover" href="mailto:contacto&#64;edoingenieriadigital.com">
              <div class="fci-icon fci-icon--blue">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div>
                <div class="fci-label">Email</div>
                <div class="fci-value">contacto&#64;edoingenieriadigital.com</div>
              </div>
            </a>
            <a class="footer-contact-item footer-contact-item--hover" href="tel:+573205554295">
              <div class="fci-icon fci-icon--green">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
              </div>
              <div>
                <div class="fci-label">Tel&#233;fono</div>
                <div class="fci-value">+57 320 555 4295</div>
              </div>
            </a>
          </div>

          <div class="footer-socials-mobile">
            <a *ngIf="socials.instagram" [href]="socials.instagram" target="_blank" rel="noopener" class="social-link social-link--ig" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a *ngIf="socials.tiktok" [href]="socials.tiktok" target="_blank" rel="noopener" class="social-link social-link--tt" aria-label="TikTok">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.18 8.18 0 004.77 1.52V6.82a4.84 4.84 0 01-1-.13z"/></svg>
            </a>
            <a href="https://wa.me/573205554295" target="_blank" rel="noopener" class="social-link social-link--wa" aria-label="WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
          </div>
        </div>

      </div>

      <!-- Bottom bar -->
      <div class="footer-bottom">
        <div class="container footer-bottom-inner">
          <span>&#169; 2026 EDO Ingenier&#237;a Digital. Todos los derechos reservados.</span>
          <div class="footer-bottom-socials">
            <a *ngIf="socials.instagram" [href]="socials.instagram" target="_blank" rel="noopener" aria-label="Instagram" class="bottom-social bottom-social--ig">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a *ngIf="socials.tiktok" [href]="socials.tiktok" target="_blank" rel="noopener" aria-label="TikTok" class="bottom-social bottom-social--tt">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.18 8.18 0 004.77 1.52V6.82a4.84 4.84 0 01-1-.13z"/></svg>
            </a>
            <a href="https://wa.me/573205554295" target="_blank" rel="noopener" aria-label="WhatsApp" class="bottom-social bottom-social--wa">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .site-footer {
      background: #0A1628;
      color: rgba(255,255,255,0.6);
      font-family: 'Outfit', sans-serif;
      position: relative;
      overflow: hidden;
    }
    .footer-glow {
      position: absolute; inset: 0; pointer-events: none;
      background: radial-gradient(ellipse at 15% -10%, rgba(232,119,34,0.08) 0%, transparent 55%),
                  radial-gradient(ellipse at 85% 110%, rgba(0,194,255,0.06) 0%, transparent 55%),
                  radial-gradient(circle at 50% 50%, rgba(255,255,255,0.01) 0%, transparent 70%);
    }

    .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

    .footer-inner {
      display: grid;
      grid-template-columns: 1.4fr 0.8fr 0.8fr 1fr;
      gap: 48px;
      padding: 64px 24px 48px;
      position: relative;
    }

    /* ═══ BRAND ═══ */
    .footer-brand { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .footer-logo { height: 44px; width: auto; object-fit: contain; }
    .footer-brand-name { font-size: 16px; font-weight: 800; color: #fff; letter-spacing: 0.3px; }
    .footer-brand-sub { font-size: 11px; color: rgba(255,255,255,0.35); letter-spacing: 1px; text-transform: uppercase; }
    .footer-tagline { font-size: 13px; line-height: 1.6; color: rgba(255,255,255,0.4); margin: 0 0 20px; max-width: 280px; }

    /* ═══ SOCIALS ═══ */
    .footer-socials { display: flex; gap: 8px; }
    .social-link {
      display: flex; align-items: center; justify-content: center;
      width: 38px; height: 38px; border-radius: 10px;
      text-decoration: none; transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
    }
    .social-link:hover { transform: translateY(-3px); }
    .social-link--ig { background: linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); color: #fff; box-shadow: 0 2px 10px rgba(225,48,108,0.3); }
    .social-link--ig:hover { box-shadow: 0 6px 20px rgba(225,48,108,0.5); }
    .social-link--tt { background: #010101; color: #00f2ea; border: 1px solid rgba(0,242,234,0.3); box-shadow: 0 2px 10px rgba(0,0,0,0.3); }
    .social-link--tt:hover { box-shadow: 0 6px 20px rgba(0,242,234,0.3); border-color: rgba(0,242,234,0.5); }
    .social-link--wa { background: #25D366; color: #fff; box-shadow: 0 2px 10px rgba(37,211,102,0.3); }
    .social-link--wa:hover { box-shadow: 0 6px 20px rgba(37,211,102,0.5); }
    .footer-socials-mobile { display: none; }

    /* ═══ HEADINGS CON ICONO + LINEA DE COLOR ═══ */
    .footer-heading {
      display: flex; align-items: center; gap: 8px;
      font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.5);
      text-transform: uppercase; letter-spacing: 1.2px;
      margin-bottom: 6px;
    }
    .fh-icon { opacity: 0.6; }
    .footer-heading-line {
      height: 2px; width: 32px; border-radius: 2px;
      margin-bottom: 18px;
    }
    .footer-heading-line--cyan   { background: #00C2FF; box-shadow: 0 0 8px rgba(0,194,255,0.4); }
    .footer-heading-line--orange { background: #E87722; box-shadow: 0 0 8px rgba(232,119,34,0.4); }
    .footer-heading-line--green  { background: #25D366; box-shadow: 0 0 8px rgba(37,211,102,0.4); }

    /* ═══ NAV LINKS ═══ */
    .footer-nav { display: flex; flex-direction: column; gap: 8px; }
    .footer-nav a {
      display: flex; align-items: center; gap: 8px;
      color: rgba(255,255,255,0.45); font-size: 14px; font-weight: 500;
      text-decoration: none; transition: all 0.2s;
      padding: 4px 0;
    }
    .footer-nav a svg { opacity: 0; transition: all 0.2s; color: #E87722; flex-shrink: 0; }
    .footer-nav a:hover { color: #fff; transform: translateX(4px); }
    .footer-nav a:hover svg { opacity: 1; }

    /* ═══ CONTACTO ITEMS ═══ */
    .footer-contact { display: flex; flex-direction: column; gap: 10px; }
    .footer-contact-item {
      display: flex; align-items: center; gap: 12px;
      font-size: 13px; color: rgba(255,255,255,0.5);
      text-decoration: none;
      padding: 8px 10px;
      border-radius: 8px;
      transition: all 0.2s;
    }
    .footer-contact-item--hover:hover {
      background: rgba(255,255,255,0.04);
      transform: translateX(3px);
    }

    .fci-icon {
      width: 32px; height: 32px; border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .fci-icon--red   { background: rgba(239,68,68,0.12); color: #ef4444; }
    .fci-icon--blue  { background: rgba(59,130,246,0.12); color: #3b82f6; }
    .fci-icon--green { background: rgba(37,211,102,0.12); color: #25D366; }

    .fci-label { font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.8px; }
    .fci-value { font-size: 13px; color: rgba(255,255,255,0.6); font-weight: 500; }

    /* ═══ BOTTOM ═══ */
    .footer-bottom { border-top: 1px solid rgba(255,255,255,0.06); padding: 20px 0; }
    .footer-bottom-inner { display: flex; align-items: center; justify-content: space-between; }
    .footer-bottom span { font-size: 12px; color: rgba(255,255,255,0.25); font-weight: 500; }
    .footer-bottom-socials { display: flex; gap: 8px; }
    .bottom-social {
      display: flex; align-items: center; justify-content: center;
      width: 26px; height: 26px; border-radius: 6px;
      text-decoration: none; transition: all 0.25s;
    }
    .bottom-social:hover { transform: translateY(-2px); }
    .bottom-social--ig { background: linear-gradient(135deg, #f09433, #dc2743, #bc1888); color: #fff; opacity: 0.75; }
    .bottom-social--ig:hover { opacity: 1; }
    .bottom-social--tt { background: #010101; color: #00f2ea; border: 1px solid rgba(0,242,234,0.2); opacity: 0.75; }
    .bottom-social--tt:hover { opacity: 1; }
    .bottom-social--wa { background: #25D366; color: #fff; opacity: 0.75; }
    .bottom-social--wa:hover { opacity: 1; }

    /* ═══ RESPONSIVE ═══ */
    @media (max-width: 900px) {
      .footer-inner { grid-template-columns: 1fr 1fr; gap: 36px; padding: 48px 24px 36px; }
    }
    @media (max-width: 600px) {
      .footer-inner { grid-template-columns: 1fr; gap: 32px; padding: 40px 20px 28px; text-align: center; }
      .footer-brand { justify-content: center; }
      .footer-tagline { margin: 0 auto 20px; }
      .footer-heading { justify-content: center; }
      .footer-heading-line { margin: 0 auto 18px; }
      .footer-socials { display: none; }
      .footer-socials-mobile {
        display: flex; justify-content: center; gap: 10px;
        margin-top: 20px; padding-top: 16px;
        border-top: 1px solid rgba(255,255,255,0.06);
      }
      .footer-nav { align-items: center; }
      .footer-nav a svg { display: none; }
      .footer-contact { align-items: center; }
      .footer-contact-item { justify-content: center; }
      .footer-bottom-inner { flex-direction: column; gap: 12px; }
    }
  `]
})
export class FooterComponent implements OnInit {
  private http = inject(HttpClient);
  socials = { instagram: '', tiktok: '', facebook: '', linkedin: '' };

  ngOnInit() {
    this.http.get<any>(`${environment.apiUrl}/site-config/`).subscribe({
      next: (cfg: any) => {
        this.socials = {
          instagram: cfg['social_instagram'] || '',
          tiktok:    cfg['social_tiktok']    || '',
          facebook:  cfg['social_facebook']  || '',
          linkedin:  cfg['social_linkedin']  || ''
        };
      },
      error: () => {
        this.socials = {
          instagram: 'https://www.instagram.com/edoingenieriadigital',
          tiktok:    'https://www.tiktok.com/@edo.ingenieria.di',
          facebook:  '', linkedin:  ''
        };
      }
    });
  }
}
