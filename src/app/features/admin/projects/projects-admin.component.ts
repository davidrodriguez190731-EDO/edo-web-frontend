import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-projects-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './projects-admin.component.html',
  styleUrls: ['./projects-admin.component.scss'],
})
export class ProjectsAdminComponent implements OnInit {
  private api = inject(ApiService);

  projects: any[] = [];
  loading  = true;
  toast    = '';
  toastType = 'success';

  showModal = false;
  saving    = false;
  form: any = {};

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
    this.form = { name:'', category:'', stackStr:'', status:'En producción', description:'', highlightsStr:'', color:'#1B4B8A', featured:false, order:99, visible:true };
    this.showModal = true;
  }

  openEdit(p: any) {
    this.form = {
      ...p,
      stackStr:      Array.isArray(p.stack) ? p.stack.join(', ') : '',
      highlightsStr: Array.isArray(p.highlights) ? p.highlights.join('\n') : '',
    };
    this.showModal = true;
  }

  save() {
    this.saving = true;
    const payload = {
      ...this.form,
      stack:      this.form.stackStr.split(',').map((s: string) => s.trim()).filter(Boolean),
      highlights: this.form.highlightsStr.split('\n').map((s: string) => s.trim()).filter(Boolean),
    };

    const req = this.form.id
      ? this.api.updateProject(this.form.id, payload)
      : this.api.createProject(payload);

    req.subscribe({
      next: () => {
        this.showToast('Proyecto guardado correctamente');
        this.showModal = false;
        this.saving    = false;
        this.load();
      },
      error: () => {
        this.showToast('Error al guardar', 'danger');
        this.saving = false;
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
    this.toast     = msg;
    this.toastType = type;
    setTimeout(() => this.toast = '', 3000);
  }
}
