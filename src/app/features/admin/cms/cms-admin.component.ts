import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface ConfigMap { [key: string]: string; }

@Component({
  selector: 'app-cms-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cms-admin.component.html',
  styleUrls: ['./cms-admin.component.scss'],
})
export class CmsAdminComponent implements OnInit {

  activeTab = 'general';
  saving    = false;
  saved     = false;
  loading   = true;
  error     = '';

  config: ConfigMap = {};
  draft:  ConfigMap = {};

  readonly tabs = [
    { id: 'general',   label: 'General',   icon: '⚙️' },
    { id: 'home',      label: 'Home',      icon: '🏠' },
    { id: 'services',  label: 'Servicios', icon: '⚡' },
    { id: 'about',     label: 'Nosotros',  icon: '👥' },
    { id: 'contact',   label: 'Contacto',  icon: '📞' },
    { id: 'seo',       label: 'SEO',       icon: '🔍' },
  ];

  readonly sections: { [tab: string]: { key: string; label: string; type?: string; hint?: string }[] } = {
    general: [
      { key: 'site_name',    label: 'Nombre del sitio' },
      { key: 'site_tagline', label: 'Tagline / eslogan' },
      { key: 'contact_email',    label: 'Email de contacto', type: 'email' },
      { key: 'contact_phone',    label: 'Teléfono visible' },
      { key: 'contact_whatsapp', label: 'Número WhatsApp', hint: 'Solo dígitos, ej: 573205554295' },
      { key: 'contact_address',  label: 'Dirección' },
      { key: 'contact_city',     label: 'Ciudad / País' },
      { key: 'contact_schedule', label: 'Horario de atención' },
      { key: 'social_instagram', label: 'Instagram URL' },
      { key: 'social_linkedin',  label: 'LinkedIn URL' },
      { key: 'social_facebook',  label: 'Facebook URL' },
    ],
    home: [
      { key: 'home_hero_tag',               label: 'Tag del hero', hint: 'Texto pequeño sobre el título' },
      { key: 'home_hero_title',             label: 'Título principal' },
      { key: 'home_hero_subtitle',          label: 'Subtítulo', type: 'textarea' },
      { key: 'home_hero_cta_primary_text',  label: 'Botón primario — texto' },
      { key: 'home_hero_cta_primary_url',   label: 'Botón primario — URL' },
      { key: 'home_hero_cta_secondary_text',label: 'Botón secundario — texto' },
      { key: 'home_stats_projects',         label: 'Stat: Proyectos', hint: 'Solo número' },
      { key: 'home_stats_clients',          label: 'Stat: Clientes', hint: 'Solo número' },
      { key: 'home_stats_years',            label: 'Stat: Años experiencia', hint: 'Solo número' },
    ],
    services: [
      { key: 'services_hero_tag',      label: 'Tag del hero' },
      { key: 'services_hero_title',    label: 'Título del hero' },
      { key: 'services_hero_subtitle', label: 'Subtítulo del hero', type: 'textarea' },
      { key: 'service_1_name',  label: 'Servicio 1 — Nombre' },
      { key: 'service_1_short', label: 'Servicio 1 — Descripción corta' },
      { key: 'service_1_desc',  label: 'Servicio 1 — Descripción completa', type: 'textarea' },
      { key: 'service_2_name',  label: 'Servicio 2 — Nombre' },
      { key: 'service_2_short', label: 'Servicio 2 — Descripción corta' },
      { key: 'service_2_desc',  label: 'Servicio 2 — Descripción completa', type: 'textarea' },
      { key: 'service_3_name',  label: 'Servicio 3 — Nombre' },
      { key: 'service_3_short', label: 'Servicio 3 — Descripción corta' },
      { key: 'service_3_desc',  label: 'Servicio 3 — Descripción completa', type: 'textarea' },
      { key: 'service_4_name',  label: 'Servicio 4 — Nombre' },
      { key: 'service_4_short', label: 'Servicio 4 — Descripción corta' },
      { key: 'service_4_desc',  label: 'Servicio 4 — Descripción completa', type: 'textarea' },
    ],
    about: [
      { key: 'about_hero_tag',      label: 'Tag del hero' },
      { key: 'about_hero_title',    label: 'Título del hero' },
      { key: 'about_hero_subtitle', label: 'Subtítulo del hero', type: 'textarea' },
      { key: 'about_stats_projects',label: 'Stat: Proyectos', hint: 'Solo número' },
      { key: 'about_stats_years',   label: 'Stat: Años experiencia', hint: 'Solo número' },
      { key: 'about_history_p1',    label: 'Historia — Párrafo 1', type: 'textarea' },
      { key: 'about_history_p2',    label: 'Historia — Párrafo 2', type: 'textarea' },
      { key: 'about_history_p3',    label: 'Historia — Párrafo 3', type: 'textarea' },
    ],
    contact: [
      { key: 'contact_email',    label: 'Email de contacto', type: 'email' },
      { key: 'contact_phone',    label: 'Teléfono visible' },
      { key: 'contact_whatsapp', label: 'Número WhatsApp', hint: 'Solo dígitos, ej: 573205554295' },
      { key: 'contact_address',  label: 'Dirección' },
      { key: 'contact_city',     label: 'Ciudad / País' },
      { key: 'contact_schedule', label: 'Horario de atención' },
    ],
    seo: [
      { key: 'site_name',        label: 'Nombre del sitio (title tag)' },
      { key: 'site_description', label: 'Meta descripción', type: 'textarea', hint: 'Máx. 160 caracteres' },
      { key: 'site_keywords',    label: 'Palabras clave', hint: 'Separadas por coma' },
    ],
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<ConfigMap>(`${environment.apiUrl}/site-config/`).subscribe({
      next: data => {
        this.config  = data;
        this.draft   = { ...data };
        this.loading = false;
      },
      error: () => {
        this.error   = 'No se pudo cargar la configuración';
        this.loading = false;
      }
    });
  }

  get currentFields() { return this.sections[this.activeTab] || []; }

  isDirty(): boolean {
    return this.currentFields.some(f => this.draft[f.key] !== this.config[f.key]);
  }

  save() {
    if (!this.isDirty()) return;
    this.saving = true;
    this.error  = '';

    const updates: ConfigMap = {};
    this.currentFields.forEach(f => {
      if (this.draft[f.key] !== this.config[f.key]) {
        updates[f.key] = this.draft[f.key] ?? '';
      }
    });

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.post(`${environment.apiUrl}/site-config/bulk`, { updates }, { headers }).subscribe({
      next: () => {
        this.config  = { ...this.config, ...updates };
        this.saving  = false;
        this.saved   = true;
        setTimeout(() => this.saved = false, 3000);
      },
      error: () => {
        this.error  = 'Error al guardar. Intente de nuevo.';
        this.saving = false;
      }
    });
  }

  discard() {
    this.currentFields.forEach(f => this.draft[f.key] = this.config[f.key]);
  }

  charCount(key: string): number {
    return (this.draft[key] || '').length;
  }
}
