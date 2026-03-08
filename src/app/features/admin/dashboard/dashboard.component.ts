import { Component, OnInit, inject, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';

interface Field { key: string; label: string; type?: string; hint?: string; }
interface Section {
  id: string; label: string; icon: string; fields: Field[];
  open: boolean; saving: boolean; saved: boolean; error: string;
  special?: 'hero_images';
}
interface Page { id: string; label: string; icon: string; route?: string; sections: Section[]; }
type ConfigMap = { [key: string]: string };

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  sidebarOpen   = false;
  activePage = 'home';
  activeSection = 'home_hero';
  config: ConfigMap = {};
  draft: ConfigMap = {};
  loading = true;

  chaosPreview = ''; chaosPending = false; chaosFile: File | null = null;
  orderPreview = ''; orderPending = false; orderFile: File | null = null;
  imgSaving = false; imgSuccess = ''; imgError = '';

  @ViewChild('chaosInput') chaosInput!: ElementRef;
  @ViewChild('orderInput') orderInput!: ElementRef;

  pages: Page[] = [
    {
      id: 'home', label: 'Inicio', icon: '🏠', route: '/',
      sections: [
        { id: 'home_hero', label: 'Hero principal', icon: '✨', open: true, saving: false, saved: false, error: '', fields: [
            { key: 'home_hero_tag',                label: 'Etiqueta (tag)',         hint: 'Texto pequeño sobre el título' },
            { key: 'home_hero_title',              label: 'Título principal' },
            { key: 'home_hero_subtitle',           label: 'Subtítulo',              type: 'textarea' },
            { key: 'home_hero_cta_primary_text',   label: 'Botón primario — texto' },
            { key: 'home_hero_cta_primary_url',    label: 'Botón primario — URL' },
            { key: 'home_hero_cta_secondary_text', label: 'Botón secundario — texto' },
            { key: 'home_slider_label_left',       label: 'Etiqueta slider izquierda', hint: 'Ej: Sin EDO' },
            { key: 'home_slider_label_right',      label: 'Etiqueta slider derecha',   hint: 'Ej: Con EDO' },
        ]},
        { id: 'home_stats', label: 'Estadísticas', icon: '📊', open: false, saving: false, saved: false, error: '', fields: [
            { key: 'home_stats_projects', label: 'Proyectos realizados', hint: 'Solo número' },
            { key: 'home_stats_clients',  label: 'Clientes atendidos',   hint: 'Solo número' },
            { key: 'home_stats_years',    label: 'Años de experiencia',  hint: 'Solo número' },
        ]},
        { id: 'home_services', label: '¿Cómo le ayudamos?', icon: '🛠️', open: false, saving: false, saved: false, error: '', fields: [
            { key: 'home_services_title',  label: 'Título de sección' },
            { key: 'home_service_a_icon',  label: 'Card A — Icono',       hint: 'Emoji' },
            { key: 'home_service_a_name',  label: 'Card A — Nombre' },
            { key: 'home_service_a_desc',  label: 'Card A — Descripción', type: 'textarea' },
            { key: 'home_service_b_icon',  label: 'Card B — Icono',       hint: 'Emoji' },
            { key: 'home_service_b_name',  label: 'Card B — Nombre' },
            { key: 'home_service_b_desc',  label: 'Card B — Descripción', type: 'textarea' },
            { key: 'home_service_c_icon',  label: 'Card C — Icono',       hint: 'Emoji' },
            { key: 'home_service_c_name',  label: 'Card C — Nombre' },
            { key: 'home_service_c_desc',  label: 'Card C — Descripción', type: 'textarea' },
        ]},
        { id: 'home_process', label: 'Proceso de trabajo', icon: '🔄', open: false, saving: false, saved: false, error: '', fields: [
            { key: 'home_process_title',   label: 'Título de sección' },
            { key: 'home_process_1_num',   label: 'Paso 1 — Número',      hint: 'Ej: 01' },
            { key: 'home_process_1_title', label: 'Paso 1 — Título' },
            { key: 'home_process_1_desc',  label: 'Paso 1 — Descripción', type: 'textarea' },
            { key: 'home_process_2_num',   label: 'Paso 2 — Número' },
            { key: 'home_process_2_title', label: 'Paso 2 — Título' },
            { key: 'home_process_2_desc',  label: 'Paso 2 — Descripción', type: 'textarea' },
            { key: 'home_process_3_num',   label: 'Paso 3 — Número' },
            { key: 'home_process_3_title', label: 'Paso 3 — Título' },
            { key: 'home_process_3_desc',  label: 'Paso 3 — Descripción', type: 'textarea' },
            { key: 'home_process_4_num',   label: 'Paso 4 — Número' },
            { key: 'home_process_4_title', label: 'Paso 4 — Título' },
            { key: 'home_process_4_desc',  label: 'Paso 4 — Descripción', type: 'textarea' },
        ]},
        { id: 'home_cta', label: 'CTA final', icon: '🚀', open: false, saving: false, saved: false, error: '', fields: [
            { key: 'home_cta_title', label: 'Título' },
            { key: 'home_cta_desc',  label: 'Descripción', type: 'textarea' },
        ]},
        { id: 'home_images', label: 'Imágenes before/after', icon: '🖼️', open: false, saving: false, saved: false, error: '', special: 'hero_images', fields: [] },
      ]
    },
    {
      id: 'services', label: 'Servicios', icon: '⚡', route: '/servicios',
      sections: [
        { id: 'services_hero', label: 'Hero', icon: '✨', open: true, saving: false, saved: false, error: '', fields: [
            { key: 'services_hero_tag',      label: 'Etiqueta (tag)' },
            { key: 'services_hero_title',    label: 'Título' },
            { key: 'services_hero_subtitle', label: 'Subtítulo', type: 'textarea' },
        ]},
        { id: 'service_1', label: 'Servicio 1 — Sistemas a la Medida', icon: '⚙️', open: false, saving: false, saved: false, error: '', fields: [
            { key: 'service_1_name',     label: 'Nombre' },
            { key: 'service_1_short',    label: 'Descripción corta' },
            { key: 'service_1_desc',     label: 'Descripción completa',  type: 'textarea' },
            { key: 'service_1_features', label: 'Features (una por línea)', type: 'textarea', hint: 'Cada línea = un checkmark' },
            { key: 'service_1_wa',       label: 'Link WhatsApp',         hint: 'URL completa wa.me/...' },
        ]},
        { id: 'service_2', label: 'Servicio 2 — Páginas Web', icon: '🌐', open: false, saving: false, saved: false, error: '', fields: [
            { key: 'service_2_name',     label: 'Nombre' },
            { key: 'service_2_short',    label: 'Descripción corta' },
            { key: 'service_2_desc',     label: 'Descripción completa',  type: 'textarea' },
            { key: 'service_2_features', label: 'Features (una por línea)', type: 'textarea', hint: 'Cada línea = un checkmark' },
            { key: 'service_2_wa',       label: 'Link WhatsApp' },
        ]},
        { id: 'service_3', label: 'Servicio 3 — Apps Móviles', icon: '📱', open: false, saving: false, saved: false, error: '', fields: [
            { key: 'service_3_name',     label: 'Nombre' },
            { key: 'service_3_short',    label: 'Descripción corta' },
            { key: 'service_3_desc',     label: 'Descripción completa',  type: 'textarea' },
            { key: 'service_3_features', label: 'Features (una por línea)', type: 'textarea', hint: 'Cada línea = un checkmark' },
            { key: 'service_3_wa',       label: 'Link WhatsApp' },
        ]},
        { id: 'service_4', label: 'Servicio 4 — Apps de Gestión', icon: '📊', open: false, saving: false, saved: false, error: '', fields: [
            { key: 'service_4_name',     label: 'Nombre' },
            { key: 'service_4_short',    label: 'Descripción corta' },
            { key: 'service_4_desc',     label: 'Descripción completa',  type: 'textarea' },
            { key: 'service_4_features', label: 'Features (una por línea)', type: 'textarea', hint: 'Cada línea = un checkmark' },
            { key: 'service_4_wa',       label: 'Link WhatsApp' },
        ]},
        { id: 'services_why', label: '¿Por qué EDO?', icon: '🏆', open: false, saving: false, saved: false, error: '', fields: [
            { key: 'services_why_title',   label: 'Título de sección' },
            { key: 'services_why_1_icon',  label: 'Card 1 — Icono', hint: 'Emoji' }, { key: 'services_why_1_title', label: 'Card 1 — Título' }, { key: 'services_why_1_desc', label: 'Card 1 — Descripción', type: 'textarea' },
            { key: 'services_why_2_icon',  label: 'Card 2 — Icono', hint: 'Emoji' }, { key: 'services_why_2_title', label: 'Card 2 — Título' }, { key: 'services_why_2_desc', label: 'Card 2 — Descripción', type: 'textarea' },
            { key: 'services_why_3_icon',  label: 'Card 3 — Icono', hint: 'Emoji' }, { key: 'services_why_3_title', label: 'Card 3 — Título' }, { key: 'services_why_3_desc', label: 'Card 3 — Descripción', type: 'textarea' },
            { key: 'services_why_4_icon',  label: 'Card 4 — Icono', hint: 'Emoji' }, { key: 'services_why_4_title', label: 'Card 4 — Título' }, { key: 'services_why_4_desc', label: 'Card 4 — Descripción', type: 'textarea' },
            { key: 'services_why_5_icon',  label: 'Card 5 — Icono', hint: 'Emoji' }, { key: 'services_why_5_title', label: 'Card 5 — Título' }, { key: 'services_why_5_desc', label: 'Card 5 — Descripción', type: 'textarea' },
            { key: 'services_why_6_icon',  label: 'Card 6 — Icono', hint: 'Emoji' }, { key: 'services_why_6_title', label: 'Card 6 — Título' }, { key: 'services_why_6_desc', label: 'Card 6 — Descripción', type: 'textarea' },
        ]},
        { id: 'services_cta', label: 'CTA final', icon: '🚀', open: false, saving: false, saved: false, error: '', fields: [
            { key: 'services_cta_title', label: 'Título' },
            { key: 'services_cta_desc',  label: 'Descripción', type: 'textarea' },
        ]},
      ]
    },
    {
      id: 'portfolio', label: 'Proyectos', icon: '🗂️', route: '/portafolio',
      sections: [
        { id: 'portfolio_mgmt', label: 'Gestión de proyectos', icon: '🗂️', open: true, saving: false, saved: false, error: '', fields: [] },
      ]
    },
    {
      id: 'about', label: 'Nosotros', icon: '👥', route: '/nosotros',
      sections: [
        { id: 'about_hero', label: 'Hero', icon: '✨', open: true, saving: false, saved: false, error: '', fields: [
            { key: 'about_hero_tag',      label: 'Etiqueta (tag)' },
            { key: 'about_hero_title',    label: 'Título' },
            { key: 'about_hero_subtitle', label: 'Subtítulo', type: 'textarea' },
        ]},
        { id: 'about_stats', label: 'Estadísticas', icon: '📊', open: false, saving: false, saved: false, error: '', fields: [
            { key: 'about_stats_projects', label: 'Proyectos', hint: 'Solo número' },
            { key: 'about_stats_years',    label: 'Años de experiencia', hint: 'Solo número' },
        ]},
        { id: 'about_history', label: 'Historia', icon: '📖', open: false, saving: false, saved: false, error: '', fields: [
            { key: 'about_history_title', label: 'Título de sección' },
            { key: 'about_history_p1',    label: 'Párrafo 1', type: 'textarea' },
            { key: 'about_history_p2',    label: 'Párrafo 2', type: 'textarea' },
            { key: 'about_history_p3',    label: 'Párrafo 3', type: 'textarea' },
        ]},
        { id: 'about_values', label: 'Valores / Principios', icon: '⭐', open: false, saving: false, saved: false, error: '', fields: [
            { key: 'about_values_title',   label: 'Título de sección' },
            { key: 'about_value_1_icon',   label: 'Valor 1 — Icono', hint: 'Emoji' }, { key: 'about_value_1_title', label: 'Valor 1 — Título' }, { key: 'about_value_1_desc', label: 'Valor 1 — Descripción', type: 'textarea' },
            { key: 'about_value_2_icon',   label: 'Valor 2 — Icono', hint: 'Emoji' }, { key: 'about_value_2_title', label: 'Valor 2 — Título' }, { key: 'about_value_2_desc', label: 'Valor 2 — Descripción', type: 'textarea' },
            { key: 'about_value_3_icon',   label: 'Valor 3 — Icono', hint: 'Emoji' }, { key: 'about_value_3_title', label: 'Valor 3 — Título' }, { key: 'about_value_3_desc', label: 'Valor 3 — Descripción', type: 'textarea' },
            { key: 'about_value_4_icon',   label: 'Valor 4 — Icono', hint: 'Emoji' }, { key: 'about_value_4_title', label: 'Valor 4 — Título' }, { key: 'about_value_4_desc', label: 'Valor 4 — Descripción', type: 'textarea' },
            { key: 'about_value_5_icon',   label: 'Valor 5 — Icono', hint: 'Emoji' }, { key: 'about_value_5_title', label: 'Valor 5 — Título' }, { key: 'about_value_5_desc', label: 'Valor 5 — Descripción', type: 'textarea' },
            { key: 'about_value_6_icon',   label: 'Valor 6 — Icono', hint: 'Emoji' }, { key: 'about_value_6_title', label: 'Valor 6 — Título' }, { key: 'about_value_6_desc', label: 'Valor 6 — Descripción', type: 'textarea' },
        ]},
        { id: 'about_timeline', label: 'Timeline / Historia', icon: '📅', open: false, saving: false, saved: false, error: '', fields: [
            { key: 'about_timeline_1_year',  label: 'Hito 1 — Año' }, { key: 'about_timeline_1_title', label: 'Hito 1 — Título' }, { key: 'about_timeline_1_desc', label: 'Hito 1 — Descripción', type: 'textarea' },
            { key: 'about_timeline_2_year',  label: 'Hito 2 — Año' }, { key: 'about_timeline_2_title', label: 'Hito 2 — Título' }, { key: 'about_timeline_2_desc', label: 'Hito 2 — Descripción', type: 'textarea' },
            { key: 'about_timeline_3_year',  label: 'Hito 3 — Año' }, { key: 'about_timeline_3_title', label: 'Hito 3 — Título' }, { key: 'about_timeline_3_desc', label: 'Hito 3 — Descripción', type: 'textarea' },
            { key: 'about_timeline_4_year',  label: 'Hito 4 — Año' }, { key: 'about_timeline_4_title', label: 'Hito 4 — Título' }, { key: 'about_timeline_4_desc', label: 'Hito 4 — Descripción', type: 'textarea' },
            { key: 'about_timeline_5_year',  label: 'Hito 5 — Año' }, { key: 'about_timeline_5_title', label: 'Hito 5 — Título' }, { key: 'about_timeline_5_desc', label: 'Hito 5 — Descripción', type: 'textarea' },
        ]},
      ]
    },
    {
      id: 'contact', label: 'Contacto', icon: '📞', route: '/contacto',
      sections: [
        { id: 'contact_info', label: 'Datos de contacto', icon: '📋', open: true, saving: false, saved: false, error: '', fields: [
            { key: 'contact_email',    label: 'Email',           type: 'email' },
            { key: 'contact_phone',    label: 'Teléfono visible' },
            { key: 'contact_whatsapp', label: 'Número WhatsApp', hint: 'Solo dígitos: 573205554295' },
            { key: 'contact_address',  label: 'Dirección' },
            { key: 'contact_city',     label: 'Ciudad / País' },
            { key: 'contact_schedule', label: 'Horario de atención' },
        ]},
      ]
    },
    {
      id: 'blog', label: 'Blog', icon: '📝',
      sections: [
        { id: 'blog_mgmt', label: 'Gestión de artículos', icon: '📝', open: true, saving: false, saved: false, error: '', fields: [] },
      ]
    },
    {
      id: 'messages', label: 'Mensajes', icon: '💬',
      sections: [
        { id: 'messages_mgmt', label: 'Bandeja de mensajes', icon: '💬', open: true, saving: false, saved: false, error: '', fields: [] },
      ]
    },
    {
      id: 'users', label: 'Usuarios', icon: '👤',
      sections: [
        { id: 'users_mgmt', label: 'Gestión de usuarios', icon: '👤', open: true, saving: false, saved: false, error: '', fields: [] },
      ]
    },
    {
      id: 'general', label: 'General / SEO', icon: '⚙️',
      sections: [
        { id: 'general_site', label: 'Datos generales', icon: '🏢', open: true, saving: false, saved: false, error: '', fields: [
            { key: 'site_name',    label: 'Nombre del sitio' },
            { key: 'site_tagline', label: 'Eslogan' },
        ]},
        { id: 'general_seo', label: 'SEO', icon: '🔍', open: false, saving: false, saved: false, error: '', fields: [
            { key: 'site_description', label: 'Meta descripción', type: 'textarea', hint: 'Máx. 160 caracteres' },
            { key: 'site_keywords',    label: 'Palabras clave',   hint: 'Separadas por coma' },
        ]},
        { id: 'general_social', label: 'Redes sociales', icon: '🔗', open: false, saving: false, saved: false, error: '', fields: [
            { key: 'social_instagram', label: 'Instagram URL' },
            { key: 'social_linkedin',  label: 'LinkedIn URL' },
            { key: 'social_facebook',  label: 'Facebook URL' },
        ]},
      ]
    },
  ];

  get currentPage(): Page | undefined { return this.pages.find(p => p.id === this.activePage); }

  get currentSection(): Section | undefined {
    return this.currentPage?.sections.find(s => s.id === this.activeSection);
  }

  ngOnInit() { this.loadConfig(); }

  loadConfig() {
    this.loading = true;
    this.http.get<ConfigMap>(`${environment.apiUrl}/site-config/`).subscribe({
      next: data => {
        this.config = data; this.draft = { ...data };
        const base = environment.apiUrl.replace('/api', '');
        if (data['hero_chaos_image']) this.chaosPreview = base + data['hero_chaos_image'];
        if (data['hero_order_image']) this.orderPreview = base + data['hero_order_image'];
        this.loading = false; this.cdr.detectChanges();
      },
      error: () => { this.loading = false; }
    });
  }

  selectPage(pageId: string) {
    // Toggle: si ya está activa, cierra el acordeón
    if (this.activePage === pageId && !this.isAdminRoute()) {
      this.activePage = '';
      this.cdr.detectChanges();
      return;
    }
    const page = this.pages.find(p => p.id === pageId);
    if (page?.sections[0]) this.activeSection = page.sections[0].id;
    this.activePage = pageId;
    if (pageId === 'portfolio') this.router.navigate(['/admin/proyectos']);
    else if (pageId === 'blog')     this.router.navigate(['/admin/blog']);
    else if (pageId === 'messages') this.router.navigate(['/admin/mensajes']);
    else if (pageId === 'users')    this.router.navigate(['/admin/usuarios']);
    else this.router.navigate(['/admin']);
    this.cdr.detectChanges();
  }

  selectSection(sectionId: string) {
    this.activeSection = sectionId;
    this.cdr.detectChanges();
  }

  toggleSection(section: Section) { section.open = !section.open; this.cdr.detectChanges(); }

  isDirty(section: Section): boolean { return section.fields.some(f => this.draft[f.key] !== this.config[f.key]); }

  saveSection(section: Section) {
    if (!this.isDirty(section)) return;
    section.saving = true; section.error = '';
    const updates: ConfigMap = {};
    section.fields.forEach(f => { if (this.draft[f.key] !== this.config[f.key]) updates[f.key] = this.draft[f.key] ?? ''; });
    const headers = new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('edo_token')}` });
    this.http.post(`${environment.apiUrl}/site-config/bulk`, { updates }, { headers }).subscribe({
      next: () => { this.config = { ...this.config, ...updates }; section.saving = false; section.saved = true; setTimeout(() => { section.saved = false; this.cdr.detectChanges(); }, 3000); this.cdr.detectChanges(); },
      error: () => { section.error = 'Error al guardar'; section.saving = false; this.cdr.detectChanges(); }
    });
  }

  discardSection(section: Section) { section.fields.forEach(f => this.draft[f.key] = this.config[f.key]); this.cdr.detectChanges(); }
  charCount(key: string): number { return (this.draft[key] || '').length; }

  triggerUpload(type: 'chaos' | 'order') {
    if (type === 'chaos') this.chaosInput.nativeElement.click();
    else this.orderInput.nativeElement.click();
  }

  onFileSelected(event: Event, type: 'chaos' | 'order') {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (type === 'chaos') { this.chaosPreview = result; this.chaosPending = true; this.chaosFile = file; }
      else { this.orderPreview = result; this.orderPending = true; this.orderFile = file; }
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  saveImage(type: 'chaos' | 'order') {
    const file = type === 'chaos' ? this.chaosFile : this.orderFile;
    const preview = type === 'chaos' ? this.chaosPreview : this.orderPreview;
    if (!file || !preview) return;
    this.imgSaving = true; this.imgSuccess = ''; this.imgError = '';
    const headers = new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('edo_token')}` });
    const key = type === 'chaos' ? 'hero_chaos_image' : 'hero_order_image';
    this.http.post(`${environment.apiUrl}/site-config/upload-image`, { key, file: preview, filename: file.name }, { headers }).subscribe({
      next: () => { this.imgSaving = false; this.imgSuccess = 'Imagen guardada'; if (type === 'chaos') this.chaosPending = false; else this.orderPending = false; setTimeout(() => { this.imgSuccess = ''; this.cdr.detectChanges(); }, 3000); this.cdr.detectChanges(); },
      error: () => { this.imgSaving = false; this.imgError = 'Error al guardar'; this.cdr.detectChanges(); }
    });
  }

  isAdminRoute(): boolean {
    const url = this.router.url;
    return url.includes('/proyectos') || url.includes('/blog') || url.includes('/mensajes') || url.includes('/site-config') || url.includes('/usuarios');
  }

  logout() { this.auth.logout(); }
}
