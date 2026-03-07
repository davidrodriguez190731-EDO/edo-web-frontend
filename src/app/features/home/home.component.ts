import {
  Component, OnInit, OnDestroy, inject,
  ElementRef, ViewChild, HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../core/services/api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private api     = inject(ApiService);
  private http    = inject(HttpClient);
  private baseUrl = environment.apiUrl.replace('/api', '');

  projects: any[] = [];
  blogs:    any[] = [];

  // Imágenes hero desde BD
  chaosImage: string | null = null;
  orderImage: string | null = null;

  // Slider before/after
  sliderPos    = 50;   // porcentaje 0–100
  isDragging   = false;
  autoTimer:   any;

  @ViewChild('sliderWrapper') sliderWrapper!: ElementRef<HTMLDivElement>;

  services = [
    { icon: '🖥️', name: 'Sistemas a la Medida',           desc: 'Software completo para su operación: mantenimiento, facturación, RRHH, inventarios. Angular + Flask + PostgreSQL.' },
    { icon: '🌐', name: 'Páginas Web Profesionales',       desc: 'Sitios rápidos, responsivos y optimizados. Mejore su presencia online, atraiga clientes y venda más.' },
    { icon: '⚡', name: 'Soluciones Digitales',            desc: 'Automatización de procesos, integraciones, dashboards y consultoría para transformar su empresa.' },
  ];

  process = [
    { n: '01', title: 'Diagnóstico', desc: 'Entendemos su operación antes de escribir código.' },
    { n: '02', title: 'Propuesta',   desc: 'Alcance, cronograma y costo. Sin sorpresas.' },
    { n: '03', title: 'Desarrollo',  desc: 'Entregas quincenales. Usted aprueba en tiempo real.' },
    { n: '04', title: 'Lanzamiento', desc: 'Producción, capacitación y soporte incluido.' },
  ];

  ngOnInit() {
    this.loadSiteConfig();
    this.api.getProjects().subscribe({ next: r => this.projects = r.slice(0, 3) });
    this.api.getPosts().subscribe({ next: r => this.blogs = r.slice(0, 3) });
    this.startAutoSlide();
  }

  loadSiteConfig() {
    this.http.get<any>(`${environment.apiUrl}/site-config/`).subscribe({
      next: cfg => {
        if (cfg.hero_chaos_image) this.chaosImage = this.baseUrl + cfg.hero_chaos_image;
        if (cfg.hero_order_image) this.orderImage = this.baseUrl + cfg.hero_order_image;
      }
    });
  }

  // ── Auto-slide suave de izquierda a derecha ──────────────────
  private startAutoSlide() {
    let direction = 1;
    this.autoTimer = setInterval(() => {
      if (this.isDragging) return;
      this.sliderPos += direction * 0.15;
      if (this.sliderPos >= 98) direction = -1;
      if (this.sliderPos <= 2)  direction = 1;
    }, 16);
  }

  // ── Drag mouse ───────────────────────────────────────────────
  startDrag(event: MouseEvent) {
    this.isDragging = true;
    this.updateSlider(event.clientX);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;
    this.updateSlider(event.clientX);
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isDragging = false;
  }

  // ── Drag touch ───────────────────────────────────────────────
  startDragTouch(event: TouchEvent) {
    this.isDragging = true;
    this.updateSlider(event.touches[0].clientX);
  }

  @HostListener('document:touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (!this.isDragging) return;
    this.updateSlider(event.touches[0].clientX);
  }

  @HostListener('document:touchend')
  onTouchEnd() {
    this.isDragging = false;
  }

  private updateSlider(clientX: number) {
    if (!this.sliderWrapper) return;
    const rect  = this.sliderWrapper.nativeElement.getBoundingClientRect();
    const pos   = ((clientX - rect.left) / rect.width) * 100;
    this.sliderPos = Math.min(100, Math.max(0, pos));
  }

  ngOnDestroy() {
    clearInterval(this.autoTimer);
  }
}
