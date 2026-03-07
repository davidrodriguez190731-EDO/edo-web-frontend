import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>

    <!-- Botón WhatsApp flotante global -->
    <a class="wa-float"
       href="https://wa.me/573205554295?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20los%20servicios%20de%20EDO%20Ingenier%C3%ADa%20Digital"
       target="_blank" aria-label="WhatsApp">
      <svg viewBox="0 0 32 32" width="26" height="26" fill="#fff">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.469 2.027 7.773L0 32l8.479-2.004A15.94 15.94 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.27 19.455c-.398-.199-2.355-1.162-2.72-1.294-.366-.133-.632-.199-.898.199-.266.398-1.031 1.294-1.264 1.56-.233.265-.465.299-.863.1-.398-.199-1.681-.619-3.2-1.975-1.183-1.055-1.981-2.358-2.214-2.756-.233-.398-.025-.613.175-.811.18-.178.398-.465.598-.698.199-.233.265-.398.398-.664.133-.266.066-.499-.033-.698-.1-.2-.898-2.163-1.23-2.962-.324-.779-.654-.673-.898-.686l-.765-.013c-.266 0-.698.1-1.064.499-.366.398-1.396 1.364-1.396 3.327s1.43 3.86 1.629 4.126c.199.265 2.815 4.298 6.822 6.027.953.411 1.697.657 2.277.841.957.305 1.828.262 2.516.159.767-.115 2.355-.962 2.688-1.892.333-.93.333-1.727.233-1.892-.1-.166-.366-.265-.764-.465z"/>
      </svg>
      <span class="wa-label">¡Escríbenos!</span>
    </a>
  `,
  styles: [`
    .wa-float {
      position: fixed; bottom: 28px; right: 28px; z-index: 9999;
      display: flex; align-items: center; gap: 10px;
      background: #25D366; color: #fff;
      padding: 13px 20px 13px 16px; border-radius: 50px;
      text-decoration: none; font-weight: 700; font-size: 14px;
      font-family: 'Outfit', sans-serif;
      box-shadow: 0 6px 24px rgba(37,211,102,0.45);
      transition: all 0.3s;
      animation: waPulse 3s infinite;
    }
    .wa-float:hover {
      background: #20b958;
      transform: scale(1.06);
      box-shadow: 0 8px 32px rgba(37,211,102,0.6);
      animation: none;
    }
    .wa-label { letter-spacing: 0.3px; }

    @keyframes waPulse {
      0%, 100% { box-shadow: 0 6px 24px rgba(37,211,102,0.45); }
      50%       { box-shadow: 0 6px 32px rgba(37,211,102,0.75), 0 0 0 8px rgba(37,211,102,0.1); }
    }

    @media (max-width: 600px) {
      .wa-float { padding: 14px; border-radius: 50%; }
      .wa-label { display: none; }
    }
  `]
})
export class AppComponent {}
