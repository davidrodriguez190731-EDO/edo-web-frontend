import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit, OnDestroy {

  activeIndex: number | null = null;
  heroCardIndex = 0;
  private heroTimer: any;

  particles: { x: number; y: number; size: number; delay: number; duration: number }[] = [];

  readonly services = [
    {
      num: '01', icon: '⚙️',
      name: 'Sistemas a la Medida',
      short: 'Automatice sus procesos internos con software diseñado para su operación.',
      desc: 'Desarrollamos sistemas completos de gestión: mantenimiento, inventarios, recursos humanos, contratos. Cada módulo es diseñado tras un diagnóstico de su operación real.',
      features: ['Módulos a su medida', 'Roles y permisos', 'Reportes automáticos', 'Notificaciones', 'Dashboard en tiempo real', 'Soporte continuo'],
      waLink: 'https://wa.me/573217733352?text=Hola%2C%20me%20interesa%20un%20sistema%20a%20la%20medida%20para%20mi%20empresa',
      color: '#1B4B8A',
    },
    {
      num: '02', icon: '🌐',
      name: 'Páginas Web Profesionales',
      short: 'Presencia digital que convierte visitantes en clientes reales.',
      desc: 'Diseñamos y desarrollamos sitios web corporativos, portafolios y landing pages con enfoque en conversión. Rápidos, seguros y optimizados para buscadores.',
      features: ['Diseño único', 'SEO básico incluido', 'Panel de administración', 'Formularios de contacto', 'Optimizado para móvil', 'Dominio y hosting'],
      waLink: 'https://wa.me/573217733352?text=Hola%2C%20quiero%20una%20p%C3%A1gina%20web%20profesional%20para%20mi%20negocio',
      color: '#0F2E5A',
    },
    {
      num: '03', icon: '📱',
      name: 'Apps Móviles PWA',
      short: 'Sus empleados trabajan en campo sin internet. Sin app stores.',
      desc: 'Aplicaciones web progresivas que funcionan offline en el celular. Sus técnicos pueden registrar información en campo sin conexión y sincronizar al volver a la red.',
      features: ['Funciona sin internet', 'Instala desde el navegador', 'Fotos y GPS', 'Sincronización automática', 'Sin app stores', 'Compatible Android e iOS'],
      waLink: 'https://wa.me/573217733352?text=Hola%2C%20necesito%20una%20app%20para%20que%20mis%20empleados%20puedan%20trabajar%20en%20campo%20sin%20internet',
      color: '#7C3AED',
    },
    {
      num: '04', icon: '📊',
      name: 'Apps Web de Gestión',
      short: 'Control total de su equipo, procesos y datos desde cualquier lugar.',
      desc: 'Plataformas web completas para gestionar equipos, proyectos, clientes o inventarios. Acceso por roles, reportes en PDF y exportación a Excel.',
      features: ['Acceso multi-usuario', 'Reportes en PDF', 'Exportación Excel', 'Filtros avanzados', 'Auditoría de cambios', 'API disponible'],
      waLink: 'https://wa.me/573217733352?text=Hola%2C%20necesito%20una%20aplicaci%C3%B3n%20web%20para%20gestionar%20mi%20equipo%20y%20procesos',
      color: '#E87722',
    },
  ];

  readonly whyEdo = [
    { icon: '🎯', title: 'Diagnóstico primero', desc: 'Antes de escribir una línea de código entendemos su problema real. No vendemos soluciones genéricas.' },
    { icon: '⚡', title: 'Entrega en producción', desc: 'Cada proyecto se entrega funcionando, desplegado y con datos reales. No prototipos ni demos.' },
    { icon: '🔧', title: 'Soporte continuo', desc: 'Acompañamos el sistema después del lanzamiento. Sus procesos evolucionan y el sistema también.' },
    { icon: '🇨🇴', title: 'Conocemos Colombia', desc: 'Entendemos el contexto empresarial colombiano: DIAN, normativas locales y necesidades reales.' },
    { icon: '💰', title: 'Precio justo', desc: 'Soluciones de calidad enterprise a precios accesibles para empresas medianas y pequeñas.' },
    { icon: '📈', title: 'Resultados medibles', desc: 'Definimos indicadores de éxito antes de empezar y los medimos con usted al finalizar.' },
  ];

  ngOnInit() {
    this.particles = Array.from({ length: 16 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 4,
      duration: Math.random() * 6 + 5,
    }));
    this.startHeroCarousel();
  }

  ngOnDestroy() {
    clearInterval(this.heroTimer);
  }

  private startHeroCarousel() {
    this.heroTimer = setInterval(() => {
      this.heroCardIndex = (this.heroCardIndex + 1) % this.services.length;
    }, 3000);
  }

  prevHeroCard() {
    clearInterval(this.heroTimer);
    this.heroCardIndex = (this.heroCardIndex - 1 + this.services.length) % this.services.length;
    this.startHeroCarousel();
  }

  nextHeroCard() {
    clearInterval(this.heroTimer);
    this.heroCardIndex = (this.heroCardIndex + 1) % this.services.length;
    this.startHeroCarousel();
  }

  toggle(i: number) {
    this.activeIndex = this.activeIndex === i ? null : i;
  }
}
