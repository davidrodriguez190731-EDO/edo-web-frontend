import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div style="padding-top:68px; padding:80px 32px; text-align:center;">
      <h2 style="font-family:'Outfit',sans-serif; color:#0F2E5A;">BlogListComponent</h2>
      <p style="color:#718096; margin-top:12px;">Página en construcción.</p>
      <a routerLink="/" style="color:#1B4B8A; font-weight:600;">← Volver al inicio</a>
    </div>
  `,
})
export class BlogListComponent {}
