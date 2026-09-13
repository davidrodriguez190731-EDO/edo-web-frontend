import {
  AfterViewInit, Component, ElementRef, OnDestroy, OnInit,
  QueryList, ViewChildren, inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  private api = inject(ApiService);

  projects: any[] = [];

  /* Antes estas cifras estaban escritas a mano: "8+ proyectos" cuando el
     portafolio mostraba 10, "5+ años" cuando la historia arranca en 2019,
     y "100% en produccion" mientras el portafolio decia otra cosa. Ahora
     salen de los mismos proyectos que alimentan el portafolio. */
  get totalProyectos(): number { return this.projects.length; }
  get sectoresLista(): string[] {
    return [...new Set(this.projects.map(p => p.category).filter(Boolean))] as string[];
  }
  get sectores(): number { return this.sectoresLista.length; }
  get anios(): number { return new Date().getFullYear() - 2019; }

  /* Valores que se muestran: suben desde cero hasta la cifra real. */
  mostrado = { proyectos: 0, sectores: 0, anios: 0 };

  readonly timeline = [
    { year: '2019', title: 'Primeras automatizaciones', desc: 'Scripts en Google Apps Script para facturación y control de contratos en JC Soluciones.' },
    { year: '2021', title: 'Primeros sistemas web', desc: 'Migración a Flask + PostgreSQL. Primer sistema de gestión de préstamos en producción.' },
    { year: '2023', title: 'Stack moderno', desc: 'EDO Gestión 360 entra en producción con múltiples empresas y sedes.' },
    { year: '2025', title: 'EDO Ingeniería Digital', desc: 'Formalización como unidad de desarrollo. Clientes en construcción, mantenimiento y retail.' },
    { year: '2026', title: 'Crecimiento', desc: 'Expansión hacia salud, estética y comercio electrónico entre empresas.' },
  ];

  @ViewChildren('revelar') revelables!: QueryList<ElementRef<HTMLElement>>;

  private observador?: IntersectionObserver;
  private temporizadores: any[] = [];

  /** Quien desactivo las animaciones en su sistema no ve ninguna. */
  private get animar(): boolean {
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  ngOnInit() {
    this.api.getProjects().subscribe({
      next: r => {
        this.projects = r;
        this.contarCifras();
      },
    });
  }

  ngAfterViewInit() {
    if (!this.animar) {
      this.revelables?.forEach(el => el.nativeElement.classList.add('visible'));
      return;
    }

    this.observador = new IntersectionObserver((entradas) => {
      entradas.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          this.observador?.unobserve(e.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });

    const observarTodo = () =>
      this.revelables.forEach(el => this.observador!.observe(el.nativeElement));

    observarTodo();
    // La franja de sectores aparece cuando llegan los proyectos del API,
    // despues del primer render: hay que volver a observar.
    this.revelables.changes.subscribe(() => observarTodo());
  }

  /** Sube cada cifra desde cero. Sin animacion, se muestran de una vez. */
  private contarCifras() {
    const destinos = {
      proyectos: this.totalProyectos,
      sectores:  this.sectores,
      anios:     this.anios,
    };

    if (!this.animar) {
      this.mostrado = { ...destinos };
      return;
    }

    (Object.keys(destinos) as (keyof typeof destinos)[]).forEach(clave => {
      const destino = destinos[clave];
      if (!destino) return;
      const paso = Math.max(30, Math.round(900 / destino));
      let actual = 0;
      const t = setInterval(() => {
        actual++;
        this.mostrado[clave] = actual;
        if (actual >= destino) clearInterval(t);
      }, paso);
      this.temporizadores.push(t);
    });
  }

  ngOnDestroy() {
    this.observador?.disconnect();
    this.temporizadores.forEach(t => clearInterval(t));
  }
}
