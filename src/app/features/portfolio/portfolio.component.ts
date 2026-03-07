import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit, OnDestroy {

  apiBase      = environment.apiUrl.replace('/api', '');
  projects: any[] = [];
  filtered:  any[] = [];
  categories: string[] = [];
  activeCategory = 'Todos';
  selected:  any  = null;
  loading    = true;
  error      = false;

  // Carrusel hero
  carouselImages: string[] = [];
  carouselIndex  = 0;
  private carouselTimer: any;

  // Modal galería
  modalImgIndex = 0;

  particles: { x: number; y: number; size: number; delay: number; duration: number }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.particles = Array.from({ length: 14 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 4,
      duration: Math.random() * 6 + 5,
    }));
    this.load();
  }

  ngOnDestroy() {
    clearInterval(this.carouselTimer);
  }

  load() {
    this.loading = true;
    this.error   = false;
    this.http.get<any[]>(`${environment.apiUrl}/projects/`).subscribe({
      next: (data) => {
        this.projects = data.sort((a, b) =>
          (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || a.order - b.order
        );
        const cats = [...new Set(data.map((p: any) => p.category).filter(Boolean))];
        this.categories = ['Todos', ...cats];
        this.filtered   = [...this.projects];
        // Recopilar imágenes de todos los proyectos para el carrusel hero
        this.carouselImages = this.projects.flatMap(p => p.images || []);
        if (this.carouselImages.length > 1) this.startCarousel();
        this.loading = false;
      },
      error: () => { this.error = true; this.loading = false; }
    });
  }

  private startCarousel() {
    this.carouselTimer = setInterval(() => {
      this.carouselIndex = (this.carouselIndex + 1) % this.carouselImages.length;
    }, 3500);
  }

  setCategory(cat: string) {
    this.activeCategory = cat;
    this.filtered = cat === 'Todos'
      ? [...this.projects]
      : this.projects.filter(p => p.category === cat);
  }

  countFor(cat: string) {
    return cat === 'Todos'
      ? this.projects.length
      : this.projects.filter(p => p.category === cat).length;
  }

  openModal(p: any) {
    this.selected     = p;
    this.modalImgIndex = 0;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.selected = null;
    document.body.style.overflow = '';
  }

  prevModalImg() {
    if (!this.selected?.images?.length) return;
    this.modalImgIndex = (this.modalImgIndex - 1 + this.selected.images.length) % this.selected.images.length;
  }

  nextModalImg() {
    if (!this.selected?.images?.length) return;
    this.modalImgIndex = (this.modalImgIndex + 1) % this.selected.images.length;
  }

  getCategoryIcon(cat: string): string {
    const map: Record<string, string> = {
      'Mantenimiento': '🔧', 'E-commerce': '🛒', 'Web': '🌐',
      'App': '📱', 'Dashboard': '📊', 'Automatización': '⚡',
    };
    return map[cat] ?? '💻';
  }

  waProject(p: any) {
    const msg = `Hola, vi el proyecto "${p.name}" en su portafolio y me interesa algo similar para mi empresa. ¿Podemos hablar?`;
    return `https://wa.me/573205554295?text=${encodeURIComponent(msg)}`;
  }

  @HostListener('document:keydown.escape')
  onEsc() { this.closeModal(); }
}
