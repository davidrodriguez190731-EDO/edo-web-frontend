import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../../../core/services/api.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-projects-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './projects-admin.component.html',
  styleUrls: ['./projects-admin.component.scss'],
})
export class ProjectsAdminComponent implements OnInit {
  private api    = inject(ApiService);
  private http   = inject(HttpClient);

  apiBase  = environment.apiUrl.replace('/api', '');
  projects: any[] = [];
  loading  = true;
  toast    = '';
  toastType = 'success';
  showModal = false;
  saving    = false;
  form: any = {};
  pendingImages: string[] = [];  // base64 nuevas aún no guardadas

  readonly statusOptions = ['En producción', 'Activo', 'En desarrollo', 'Completado'];

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.api.getAllProjects().subscribe({
      next: r => { this.projects = r; this.loading = false; },
      error: () => this.loading = false,
    });
  }

  openCreate() {
    this.form = {
      name: '', category: '', status: 'En producción',
      description: '', highlightsStr: '', color: '#1B4B8A',
      featured: false, order: 99, visible: true, images: [],
    };
    this.pendingImages = [];
    this.showModal = true;
  }

  openEdit(p: any) {
    this.form = {
      ...p,
      highlightsStr: Array.isArray(p.highlights) ? p.highlights.join('\n') : '',
      images: [...(p.images || [])],
    };
    this.pendingImages = [];
    this.showModal = true;
  }

  onImagesSelected(event: Event) {
    const files = Array.from((event.target as HTMLInputElement).files || []);
    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        this.showToast('Una imagen supera 5MB', 'danger'); return;
      }
      const reader = new FileReader();
      reader.onload = e => {
        const b64 = e.target?.result as string;
        this.form.images = [...(this.form.images || []), b64];
      };
      reader.readAsDataURL(file);
    });
    (event.target as HTMLInputElement).value = '';
  }

  removeImage(i: number) {
    this.form.images = this.form.images.filter((_: any, idx: number) => idx !== i);
  }

  save() {
    this.saving = true;
    const token = localStorage.getItem('edo_token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    const payload = {
      ...this.form,
      highlights: this.form.highlightsStr.split('\n').map((s: string) => s.trim()).filter(Boolean),
      images: this.form.images || [],
    };
    delete payload.highlightsStr;

    const url = this.form.id
      ? `${environment.apiUrl}/projects/${this.form.id}`
      : `${environment.apiUrl}/projects/`;
    const req = this.form.id
      ? this.http.put<any>(url, payload, { headers })
      : this.http.post<any>(url, payload, { headers });

    req.subscribe({
      next: () => {
        this.showToast('✓ Proyecto guardado');
        this.showModal = false; this.saving = false; this.load();
      },
      error: () => {
        this.showToast('Error al guardar', 'danger'); this.saving = false;
      },
    });
  }

  delete(id: number) {
    if (!confirm('¿Eliminar este proyecto?')) return;
    this.api.deleteProject(id).subscribe({
      next: () => { this.showToast('Proyecto eliminado', 'danger'); this.load(); },
    });
  }

  showToast(msg: string, type = 'success') {
    this.toast = msg; this.toastType = type;
    setTimeout(() => this.toast = '', 3000);
  }
}
