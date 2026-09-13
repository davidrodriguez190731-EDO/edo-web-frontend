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
      num: '01', icon: 'app',
      name: 'Aplicaciones a la medida',
      short: 'Software construido para su operación, no adaptado de una plantilla.',
      desc: 'Partimos de cómo trabaja su negocio hoy y construimos el sistema alrededor de ese proceso. Sin módulos que sobran, sin forzar su forma de trabajar para que encaje en un programa genérico. Se entrega funcionando, con sus datos adentro.',
      features: [
        'Diseñado sobre su proceso real, no sobre un molde',
        'Se usa desde el computador o el celular, sin instalar nada',
        'Accesos y permisos por cargo',
        'Crece con el negocio: se agregan módulos después',
        'Se conecta con otros sistemas cuando se necesita',
        'Acompañamiento después de la entrega',
      ],
      waLink: 'https://wa.me/573217733352?text=Hola%2C%20necesito%20una%20aplicaci%C3%B3n%20a%20la%20medida%20para%20mi%20negocio',
      color: '#1B4B8A',
    },
    {
      num: '02', icon: 'control',
      name: 'Sistemas de gestión y control',
      short: 'Agenda, inventario, costos, cartera y personal en un solo lugar.',
      desc: 'Lo que hoy está repartido entre cuadernos, hojas de cálculo y la memoria de alguien queda en un sistema con la información al día. Cada quien ve lo que le corresponde y usted ve el panorama completo, sin pedirle un reporte a nadie.',
      features: [
        'Toda la operación en una sola fuente de información',
        'Indicadores del negocio al día, sin consolidar a mano',
        'Historial de cada cliente, producto u obra',
        'Control de lo que entra y lo que sale',
        'Consultas y exportación a Excel cuando lo necesite',
        'Registro de quién hizo cada cambio, según el sistema',
      ],
      waLink: 'https://wa.me/573217733352?text=Hola%2C%20quiero%20un%20sistema%20de%20gesti%C3%B3n%20para%20controlar%20mi%20operaci%C3%B3n',
      color: '#0F2E5A',
    },
    {
      num: '03', icon: 'web',
      name: 'Páginas web',
      short: 'Que lo encuentren, entiendan qué hace y le escriban.',
      desc: 'Sitios corporativos y de producto que usted mismo administra: cambia textos, fotos y contenidos sin depender de nadie. Preparados para aparecer en buscadores y para que el visitante termine escribiéndole.',
      features: [
        'Diseño propio, no una plantilla repetida',
        'Panel para editar contenidos usted mismo',
        'Preparada para buscadores desde el primer día',
        'Se ve bien en celular, que es por donde llega la mayoría',
        'Formulario y WhatsApp integrados',
        'Dominio y alojamiento según el plan',
      ],
      waLink: 'https://wa.me/573217733352?text=Hola%2C%20quiero%20una%20p%C3%A1gina%20web%20para%20mi%20empresa',
      color: '#00A3C4',
    },
    {
      num: '04', icon: 'auto',
      name: 'Automatización de procesos',
      short: 'Lo repetitivo deja de hacerse a mano.',
      desc: 'Todo lo que alguien rehace cada semana: armar informes, generar documentos, calcular liquidaciones, cruzar archivos, recordar citas. El sistema lo hace solo, en segundos y sin equivocarse. Es donde el ahorro se nota más rápido.',
      features: [
        'Informes y documentos generados solos, listos para enviar',
        'Cálculos que se rehacen a mano cada mes, automáticos',
        'Recordatorios y avisos sin que nadie los mande',
        'Cruce de archivos y conciliaciones sin digitar',
        'Atención automatizada por WhatsApp con inteligencia artificial',
        'Se integra con lo que ya usa el negocio',
      ],
      waLink: 'https://wa.me/573217733352?text=Hola%2C%20quiero%20automatizar%20procesos%20repetitivos%20en%20mi%20empresa',
      color: '#E87722',
    },
  ];

  readonly whyEdo = [
    { icon: 'target', title: 'Primero entender, después construir', desc: 'Antes de escribir una línea de código revisamos cómo trabaja hoy. La mayoría de los sistemas fallan por resolver el problema equivocado.' },
    { icon: 'rocket', title: 'Se entrega funcionando', desc: 'Cada proyecto se entrega en producción, con datos reales y gente usándolo. No prototipos ni demostraciones.' },
    { icon: 'wrench', title: 'Acompañamiento después', desc: 'El negocio cambia y el sistema tiene que cambiar con él. Seguimos ahí después del lanzamiento.' },
    { icon: 'flag', title: 'Conocemos el contexto local', desc: 'Facturación, DIAN, normativa y la forma real en que opera una empresa colombiana.' },
    { icon: 'chat', title: 'Se habla claro', desc: 'Sin jerga técnica ni promesas que no se sostienen. Si algo no se puede hacer, se dice.' },
    { icon: 'shield', title: 'Su información es suya', desc: 'Cada negocio con sus datos separados, accesos por cargo y respaldos. Usted es el dueño de su información.' },
  ];

  ngOnInit() {
    this.particles = Array.from({ length: 16 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 4,
      duration: Math.random() * 6 + 5,
    }));
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
  }

  nextHeroCard() {
    clearInterval(this.heroTimer);
    this.heroCardIndex = (this.heroCardIndex + 1) % this.services.length;
  }

  toggle(i: number) {
    this.activeIndex = this.activeIndex === i ? null : i;
  }
}
