import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-blog-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<div class="admin-page">
  <div class="page-header">
    <div>
      <h1>Artículos del blog</h1>
      <p>{{ posts.length }} artículos publicados</p>
    </div>
    <button (click)="openCreate()" class="btn btn--blue">+ Nuevo artículo</button>
  </div>

  <div *ngIf="loading" class="loading-state">Cargando artículos...</div>

  <div *ngIf="!loading" class="item-list">
    <div *ngFor="let p of posts" class="item-row">
      <div class="item-color-dot" [style.background]="catColor(p.category)"></div>
      <div class="item-info">
        <div class="item-name">{{ p.title }}</div>
        <div class="item-meta">
          <span>{{ p.category }}</span>
          <span>{{ p.readTime }}</span>
          <span>{{ p.date }}</span>
          <span *ngIf="!p.published" class="badge" style="background:#FED7D7;color:#C53030;">Borrador</span>
        </div>
      </div>
      <div class="item-actions">
        <button (click)="openEdit(p)" class="icon-btn icon-btn--edit">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
        <button (click)="delete(p.id)" class="icon-btn icon-btn--delete">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
          </svg>
        </button>
      </div>
    </div>
    <div *ngIf="posts.length === 0" class="empty-state">No hay artículos todavía.</div>
  </div>
</div>

<!-- Modal -->
<div *ngIf="showModal" class="modal-backdrop" (click)="showModal=false">
  <div class="modal" (click)="$event.stopPropagation()">
    <div class="modal-header">
      <h3>{{ form.id ? 'Editar artículo' : 'Nuevo artículo' }}</h3>
      <button (click)="showModal=false" class="close-btn">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label>Título</label>
        <input type="text" [(ngModel)]="form.title" placeholder="Título del artículo..." />
      </div>
      <div class="form-group">
        <label>Extracto</label>
        <textarea rows="3" [(ngModel)]="form.excerpt" placeholder="Resumen breve visible en la lista..."></textarea>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Categoría</label>
          <select [(ngModel)]="form.category">
            <option *ngFor="let c of categories">{{ c }}</option>
          </select>
        </div>
        <div class="form-group">
          <label>Tiempo de lectura</label>
          <input type="text" [(ngModel)]="form.readTime" placeholder="5 min" />
        </div>
      </div>
      <div class="form-group">
        <label>Contenido completo</label>
        <textarea rows="8" [(ngModel)]="form.content" placeholder="Contenido del artículo en texto plano o Markdown..."></textarea>
      </div>
      <div class="form-checks">
        <label class="check-label">
          <input type="checkbox" [(ngModel)]="form.published" />
          Publicar (visible en el sitio)
        </label>
      </div>
    </div>
    <div class="modal-footer">
      <button (click)="showModal=false" class="btn btn--outline">Cancelar</button>
      <button (click)="save()" class="btn btn--blue" [disabled]="saving">
        {{ saving ? 'Guardando...' : 'Guardar artículo' }}
      </button>
    </div>
  </div>
</div>

<div *ngIf="toast" class="toast" [class.toast--success]="toastType==='success'" [class.toast--danger]="toastType==='danger'">
  {{ toastType === 'success' ? '✅' : '🗑️' }} {{ toast }}
</div>
  `,
  styleUrls: ['../projects/projects-admin.component.scss'],
})
export class BlogAdminComponent implements OnInit {
  private api = inject(ApiService);

  posts: any[]  = [];
  loading       = true;
  showModal     = false;
  saving        = false;
  form: any     = {};
  toast         = '';
  toastType     = 'success';

  readonly categories = ['Análisis', 'Caso de éxito', 'Técnico', 'Opinión'];

  catColor(cat: string): string {
    const map: any = { 'Caso de éxito': '#38A169', 'Técnico': '#7C3AED', 'Opinión': '#DD6B20' };
    return map[cat] || '#1B4B8A';
  }

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.api.getAllPosts().subscribe({
      next: r => { this.posts = r; this.loading = false; },
      error: () => this.loading = false,
    });
  }

  openCreate() {
    this.form = { title:'', excerpt:'', content:'', category:'Análisis', readTime:'5 min', published:true };
    this.showModal = true;
  }

  openEdit(p: any) { this.form = { ...p }; this.showModal = true; }

  save() {
    this.saving = true;
    const req = this.form.id
      ? this.api.updatePost(this.form.id, this.form)
      : this.api.createPost(this.form);

    req.subscribe({
      next: () => {
        this.showToast('Artículo guardado');
        this.showModal = false; this.saving = false; this.load();
      },
      error: () => { this.showToast('Error al guardar', 'danger'); this.saving = false; },
    });
  }

  delete(id: number) {
    if (!confirm('¿Eliminar este artículo?')) return;
    this.api.deletePost(id).subscribe({
      next: () => { this.showToast('Artículo eliminado', 'danger'); this.load(); },
    });
  }

  showToast(msg: string, type = 'success') {
    this.toast = msg; this.toastType = type;
    setTimeout(() => this.toast = '', 3000);
  }
}
