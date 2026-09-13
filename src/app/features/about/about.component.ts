import { Component, OnInit, inject } from '@angular/core';
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
export class AboutComponent implements OnInit {
  private api = inject(ApiService);

  projects: any[] = [];

  /* Antes estas cifras estaban escritas a mano: "8+ proyectos" cuando el
     portafolio mostraba 10, "5+ años" cuando la historia arranca en 2019,
     y "100% en produccion" mientras el portafolio decia otra cosa. Ahora
     salen de los mismos proyectos que alimentan el portafolio, asi que no
     se pueden contradecir. */
  get totalProyectos(): number {
    return this.projects.length;
  }

  get sectores(): number {
    return new Set(this.projects.map(p => p.category).filter(Boolean)).size;
  }

  get anios(): number {
    return new Date().getFullYear() - 2019;
  }

  readonly timeline = [
    { year: '2019', title: 'Primeras automatizaciones', desc: 'Scripts en Google Apps Script para facturación y control de contratos en JC Soluciones.' },
    { year: '2021', title: 'Primeros sistemas web', desc: 'Migración a Flask + PostgreSQL. Primer sistema de gestión de préstamos en producción.' },
    { year: '2023', title: 'Stack moderno', desc: 'EDO Gestión 360 entra en producción con múltiples empresas y sedes.' },
    { year: '2025', title: 'EDO Ingeniería Digital', desc: 'Formalización como unidad de desarrollo. Clientes en construcción, mantenimiento y retail.' },
    { year: '2026', title: 'Crecimiento', desc: 'Expansión hacia salud, estética y comercio electrónico entre empresas.' },
  ];

  ngOnInit() {
    this.api.getProjects().subscribe({ next: r => this.projects = r });
  }
}
