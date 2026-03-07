import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private api = inject(ApiService);

  projects: any[] = [];
  blogs: any[]    = [];

  // Counter de horas perdidas
  secondsOnPage = 0;
  private timer: any;
  // ~444 horas por segundo perdidas en Colombia (base: 12M PyMEs × 3.2h/día ÷ 86400)
  get hoursLost(): string {
    return (this.secondsOnPage * 444).toLocaleString('es-CO');
  }

  // Chaos vs Order toggle
  showChaos = true;
  private toggleTimer: any;

  // Stats
  stats = [
    { val: '68%',  label: 'de PyMEs usa Excel para gestión operativa',         icon: '📊' },
    { val: '3.2h', label: 'perdidas por empleado al día en tareas manuales',   icon: '⏰' },
    { val: '12×',  label: 'más rápido con un sistema vs proceso manual',       icon: '⚡' },
    { val: '60d',  label: 'promedio para tener su sistema en producción',      icon: '🚀' },
  ];

  chaosItems = [
    { app: 'WhatsApp',  emoji: '📱', msg: 'Oye, ¿ya hiciste el mantenimiento del #5?', time: '9:14', color: '#25D366' },
    { app: 'Excel',     emoji: '📊', msg: 'MANTENIMIENTO_FINAL_v3_BUENO_ESTE.xlsx',     time: '9:31', color: '#217346' },
    { app: 'Email',     emoji: '📧', msg: 'Reporte de la semana (ver adjunto)',         time: '10:02', color: '#0072C6' },
    { app: 'Papel',     emoji: '📝', msg: 'Orden de trabajo #234 (archivada)',          time: '—',     color: '#E2A800' },
  ];

  orderStats = [
    { n: '18',  label: 'Órdenes activas' },
    { n: '94%', label: 'Cumplimiento' },
    { n: '3',   label: 'Pendientes' },
  ];

  orderItems = [
    { icon: '✅', text: 'OT #234 cerrada — Técnico: Martínez', sub: 'Tiempo: 2.5h · Conforme 100%', color: '#68D391' },
    { icon: '🔧', text: 'OT #235 asignada automáticamente',    sub: 'Sede Norte · Prioridad: Media', color: '#00C2FF' },
    { icon: '📄', text: 'Informe semanal generado en PDF',     sub: 'Enviado a gerencia · 08:00 AM', color: '#B794F4' },
  ];

  problems = [
    { icon: '📋', pain: 'Información en múltiples archivos Excel sin versión única de verdad',    cost: 'Decisiones equivocadas por datos desactualizados' },
    { icon: '📱', pain: 'Coordinación operativa por WhatsApp sin trazabilidad',                  cost: 'Tareas perdidas, responsables indefinidos' },
    { icon: '🖨️', pain: 'Reportes que alguien arma manualmente cada semana',                     cost: '4-8 horas perdidas por empleado en reportes' },
    { icon: '🗂️', pain: 'Órdenes de trabajo en papel o email sin seguimiento',                   cost: 'Trabajos duplicados o que nadie recuerda' },
    { icon: '🔍', pain: 'No puede saber en tiempo real qué está pasando en campo',               cost: 'Sorpresas en auditorías y entregas' },
    { icon: '📊', pain: 'Consolidar datos de múltiples sedes tarda días',                        cost: 'Gerencia toma decisiones a ciegas' },
  ];

  services = [
    { icon: '🖥️', name: 'Apps Web a la Medida',             desc: 'Sistemas completos con Angular + Flask + PostgreSQL. Mantenimiento, facturación, RRHH, inventarios.' },
    { icon: '🛒', name: 'E-commerce B2B',                    desc: 'Plataformas para distribuidoras con catálogo, pedidos, aprobación de clientes y fidelización.' },
    { icon: '⚡', name: 'Automatización Google Workspace',   desc: 'GAS para facturas DIAN, reportes, conciliaciones y flujos de aprobación automáticos.' },
    { icon: '📱', name: 'Apps Móviles (PWA)',                 desc: 'Inspecciones en campo con foto y voz. Sin internet. Sin app store.' },
    { icon: '📊', name: 'Dashboards e Inteligencia',         desc: 'KPIs en tiempo real, rankings y reportes PDF automáticos a gerencia.' },
    { icon: '☁️', name: 'Despliegue y Soporte',              desc: 'Railway Cloud, dominio propio, SSL, backups y soporte continuo.' },
  ];

  process = [
    { n: '01', title: 'Diagnóstico',  desc: 'Entendemos su operación antes de escribir código.' },
    { n: '02', title: 'Propuesta',    desc: 'Alcance, cronograma y costo. Sin sorpresas.' },
    { n: '03', title: 'Desarrollo',   desc: 'Entregas quincenales. Usted aprueba en tiempo real.' },
    { n: '04', title: 'Lanzamiento',  desc: 'Producción, capacitación y soporte incluido.' },
  ];

  ngOnInit() {
    this.timer       = setInterval(() => this.secondsOnPage++, 1000);
    this.toggleTimer = setInterval(() => this.showChaos = !this.showChaos, 3500);

    this.api.getProjects().subscribe({ next: r => this.projects = r.slice(0, 2) });
    this.api.getPosts().subscribe({ next: r => this.blogs = r.slice(0, 3) });
  }

  ngOnDestroy() {
    clearInterval(this.timer);
    clearInterval(this.toggleTimer);
  }
}
