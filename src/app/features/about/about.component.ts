import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit, OnDestroy {

  valueIndex = 0;
  private valueTimer: any;

  particles: { x: number; y: number; size: number; delay: number; duration: number }[] = [];

  stats = { projects: 8, years: 5 };

  readonly values = [
    { icon: '🎯', title: 'Diagnóstico primero', desc: 'Antes de escribir código entendemos su problema real. No vendemos soluciones genéricas.' },
    { icon: '⚡', title: 'Entrega en producción', desc: 'Cada proyecto se entrega funcionando con datos reales, no prototipos.' },
    { icon: '🔧', title: 'Soporte continuo', desc: 'El sistema evoluciona con su negocio. No lo dejamos solo después del lanzamiento.' },
    { icon: '🤝', title: 'Comunicación directa', desc: 'Habla con el desarrollador, no con intermediarios ni account managers.' },
    { icon: '💰', title: 'Precio justo', desc: 'Calidad enterprise a precios accesibles para empresas medianas y pequeñas.' },
    { icon: '🇨🇴', title: 'Contexto colombiano', desc: 'Entendemos DIAN, normativas locales y las necesidades reales del empresario colombiano.' },
  ];

  readonly timeline = [
    { year: '2019', title: 'Primeras automatizaciones', desc: 'Scripts en Google Apps Script para facturación y control de contratos en JC Soluciones.' },
    { year: '2021', title: 'Primeros sistemas web', desc: 'Migración a Flask + PostgreSQL. Primer sistema de gestión de préstamos en producción.' },
    { year: '2023', title: 'Stack moderno', desc: 'Adopción de Angular + Flask + Railway. EDO Gestión 360 entra en producción.' },
    { year: '2025', title: 'EDO Ingeniería Digital', desc: 'Formalización como unidad de desarrollo. Múltiples clientes en construcción, mantenimiento y retail.' },
    { year: '2026', title: 'Crecimiento', desc: 'Expansión hacia e-commerce B2B y plataformas de simulación para certificaciones.' },
  ];

  ngOnInit() {
    this.particles = Array.from({ length: 14 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 4,
      duration: Math.random() * 6 + 5,
    }));
    this.valueTimer = setInterval(() => {
      this.valueIndex = (this.valueIndex + 1) % this.values.length;
    }, 2800);
  }

  ngOnDestroy() { clearInterval(this.valueTimer); }
}
