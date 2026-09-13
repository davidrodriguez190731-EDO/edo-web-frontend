import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ProjectModalComponent } from '../../shared/components/project-modal/project-modal.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ProjectModalComponent],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit, OnDestroy {
  /** Cloudinary devuelve URL absoluta; las imagenes antiguas son rutas del backend. */
  imgUrl(v: string): string {
    if (!v) return '';
    if (v.startsWith('data:') || v.startsWith('http')) return v;
    return environment.apiUrl.replace('/api', '') + v;
  }


  apiBase      = environment.apiUrl.replace('/api', '');
  projects: any[] = [];
  filtered:  any[] = [];
  categories: string[] = [];
  searchQuery     = '';
  activeCategory = 'Todos';
  selected:  any  = null;
  loading    = true;
  error      = false;

  // Carrusel hero
  carouselImages: string[] = [];
  carouselIndex  = 0;
  private carouselTimer: any;

  // El modal es un componente aparte; aqui solo se guarda cual esta abierto.

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
    this.searchQuery     = '';
    this.activeCategory = cat;
    this.filtered = cat === 'Todos'
      ? [...this.projects]
      : this.projects.filter(p => p.category === cat);
  }

  openModal(p: any) { this.selected = p; }

  closeModal()      { this.selected = null; }

  countFor(cat: string) {
    return cat === 'Todos'
      ? this.projects.length
      : this.projects.filter(p => p.category === cat).length;
  }

  /** Cifras del encabezado: se calculan de los proyectos cargados,
   *  asi que se actualizan solas al agregar uno desde el panel. */
  get statTotal(): number {
    return this.projects.length;
  }

  get statEnProduccion(): number {
    if (!this.projects.length) return 0;
    const enProd = this.projects.filter(p => p.status === 'En producción').length;
    return Math.round((enProd / this.projects.length) * 100);
  }

  get statSectores(): number {
    return new Set(this.projects.map(p => p.category).filter(Boolean)).size;
  }

  getCategoryIcon(cat: string): string {
    const map: Record<string, string> = {
      'Mantenimiento': '🔧', 'E-commerce': '🛒', 'Web': '🌐',
      'App': '📱', 'Dashboard': '📊', 'Automatización': '⚡',
    };
    return map[cat] ?? '💻';
  }



  onSearch() {
    this.applyFilters();
  }

  clearSearch() {
    this.searchQuery = '';
    this.applyFilters();
  }

  applyFilters() {
    let result = this.projects;
    if (this.activeCategory !== 'Todos') {
      result = result.filter(p => p.category === this.activeCategory);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.stack?.toLowerCase().includes(q)
      );
    }
    this.filtered = result;
  }

}