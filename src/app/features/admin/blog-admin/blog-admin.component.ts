import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-blog-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog-admin.component.html',
  styleUrls: ['./blog-admin.component.scss'],
})
export class BlogAdminComponent implements OnInit {
  private api = inject(ApiService);

  posts: any[] = [];
  loading      = true;
  showModal    = false;
  saving       = false;
  form: any    = {};
  toast        = '';
  toastType    = 'success';

  readonly categories = ['Análisis', 'Caso de éxito', 'Técnico', 'Opinión'];

  catColor(cat: string): string {
    const map: Record<string, string> = {
      'Caso de éxito': '#38A169', 'Técnico': '#7C3AED', 'Opinión': '#DD6B20'
    };
    return map[cat] || '#1B4B8A';
  }

  catBadgeClass(cat: string): string {
    const map: Record<string, string> = {
      'Caso de éxito': 'badge--green', 'Técnico': 'badge--purple',
      'Opinión': 'badge--orange', 'Análisis': 'badge--blue'
    };
    return map[cat] || 'badge--gray';
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
    this.form = { title: '', excerpt: '', content: '', category: 'Análisis', readTime: '5 min', published: true };
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
