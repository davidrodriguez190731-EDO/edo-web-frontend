import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface AdminUser {
  id: number; username: string; email: string;
  full_name: string; is_active: boolean; created_at: string;
}

@Component({
  selector: 'app-users-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<div class="users-page">

  <!-- Header -->
  <div class="users-header">
    <div>
      <h1 class="users-title">👤 Usuarios Admin</h1>
      <p class="users-sub">Gestiona quién tiene acceso al panel de administración</p>
    </div>
    <button class="btn-new" (click)="openCreate()">+ Nuevo usuario</button>
  </div>

  <!-- Alertas -->
  <div class="alert alert-success" *ngIf="successMsg">✅ {{ successMsg }}</div>
  <div class="alert alert-error"   *ngIf="errorMsg">⚠️ {{ errorMsg }}</div>

  <!-- Tabla -->
  <div class="users-card">
    <div class="loading" *ngIf="loading">Cargando usuarios...</div>
    <table class="users-table" *ngIf="!loading">
      <thead>
        <tr>
          <th>Usuario</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Estado</th>
          <th>Creado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let u of users">
          <td><span class="username">{{ u.username }}</span></td>
          <td>{{ u.full_name || '—' }}</td>
          <td>{{ u.email || '—' }}</td>
          <td>
            <span class="badge" [class.badge-green]="u.is_active" [class.badge-red]="!u.is_active">
              {{ u.is_active ? 'Activo' : 'Inactivo' }}
            </span>
          </td>
          <td>{{ u.created_at }}</td>
          <td class="actions">
            <button class="btn-edit"   (click)="openEdit(u)">✏️ Editar</button>
            <button class="btn-delete" (click)="confirmDelete(u)" [disabled]="u.id === currentUserId">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Modal crear/editar -->
  <div class="modal-overlay" *ngIf="showModal" (click)="closeModal()">
    <div class="modal" (click)="$event.stopPropagation()">
      <div class="modal-header">
        <h2>{{ editMode ? 'Editar usuario' : 'Nuevo usuario' }}</h2>
        <button class="modal-close" (click)="closeModal()">✕</button>
      </div>
      <div class="modal-body">
        <div class="field-group">
          <label>Nombre completo</label>
          <input class="field-input" [(ngModel)]="form.full_name" placeholder="Ej: Eder Rodríguez">
        </div>
        <div class="field-group">
          <label>Usuario <span class="req">*</span></label>
          <input class="field-input" [(ngModel)]="form.username" placeholder="Ej: admin">
        </div>
        <div class="field-group">
          <label>Email</label>
          <input class="field-input" type="email" [(ngModel)]="form.email" placeholder="correo@ejemplo.com">
        </div>
        <div class="field-group">
          <label>{{ editMode ? 'Nueva contraseña' : 'Contraseña' }} <span class="req" *ngIf="!editMode">*</span></label>
          <input class="field-input" type="password" [(ngModel)]="form.password" [placeholder]="editMode ? 'Dejar vacío para no cambiar' : 'Mínimo 6 caracteres'">
        </div>
        <div class="field-group" *ngIf="editMode">
          <label>Estado</label>
          <select class="field-input" [(ngModel)]="form.is_active">
            <option [ngValue]="true">Activo</option>
            <option [ngValue]="false">Inactivo</option>
          </select>
        </div>
        <div class="modal-error" *ngIf="modalError">⚠️ {{ modalError }}</div>
      </div>
      <div class="modal-footer">
        <button class="btn-cancel" (click)="closeModal()">Cancelar</button>
        <button class="btn-submit" (click)="submitForm()" [disabled]="saving">
          {{ saving ? 'Guardando...' : (editMode ? 'Guardar cambios' : 'Crear usuario') }}
        </button>
      </div>
    </div>
  </div>

  <!-- Modal confirmar eliminar -->
  <div class="modal-overlay" *ngIf="showDeleteModal" (click)="showDeleteModal=false">
    <div class="modal modal-sm" (click)="$event.stopPropagation()">
      <div class="modal-header">
        <h2>Eliminar usuario</h2>
        <button class="modal-close" (click)="showDeleteModal=false">✕</button>
      </div>
      <div class="modal-body">
        <p>¿Estás seguro de eliminar al usuario <strong>{{ userToDelete?.username }}</strong>? Esta acción no se puede deshacer.</p>
      </div>
      <div class="modal-footer">
        <button class="btn-cancel" (click)="showDeleteModal=false">Cancelar</button>
        <button class="btn-delete-confirm" (click)="deleteUser()" [disabled]="saving">
          {{ saving ? 'Eliminando...' : 'Sí, eliminar' }}
        </button>
      </div>
    </div>
  </div>

</div>
  `,
  styles: [`
.users-page { padding: 24px; }
.users-header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:24px; }
.users-title { font-size:22px; font-weight:700; color:#0F2E5A; margin:0; }
.users-sub   { font-size:13px; color:#94A3B8; margin:4px 0 0; }
.btn-new { padding:9px 20px; background:#E87722; color:#fff; border:none; border-radius:8px; font-size:13px; font-weight:600; cursor:pointer; }
.btn-new:hover { background:#D4691A; }

.alert { padding:10px 16px; border-radius:8px; font-size:13px; margin-bottom:16px; }
.alert-success { background:#F0FFF4; color:#276749; }
.alert-error   { background:#FFF5F5; color:#C53030; }

.users-card { background:#fff; border-radius:12px; border:1px solid #E2E8F0; overflow:hidden; }
.loading { padding:32px; text-align:center; color:#94A3B8; }

.users-table { width:100%; border-collapse:collapse; font-size:13px; }
.users-table th { padding:12px 16px; background:#F8FAFC; color:#64748B; font-weight:600; text-align:left; border-bottom:1px solid #E2E8F0; }
.users-table td { padding:12px 16px; border-bottom:1px solid #F1F5F9; color:#374151; }
.users-table tr:last-child td { border-bottom:none; }
.users-table tr:hover td { background:#FAFBFC; }

.username { font-weight:600; color:#0F2E5A; font-family:monospace; }
.badge { padding:3px 10px; border-radius:20px; font-size:11px; font-weight:600; }
.badge-green { background:#F0FFF4; color:#276749; }
.badge-red   { background:#FFF5F5; color:#C53030; }

.actions { display:flex; gap:6px; }
.btn-edit   { padding:5px 10px; background:#EFF6FF; color:#2563EB; border:1px solid #BFDBFE; border-radius:6px; font-size:12px; cursor:pointer; }
.btn-edit:hover { background:#DBEAFE; }
.btn-delete { padding:5px 8px; background:#FFF5F5; color:#EF4444; border:1px solid #FECACA; border-radius:6px; font-size:12px; cursor:pointer; }
.btn-delete:hover:not(:disabled) { background:#FEE2E2; }
.btn-delete:disabled { opacity:0.4; cursor:not-allowed; }

.modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:1000; display:flex; align-items:center; justify-content:center; }
.modal { background:#fff; border-radius:14px; width:100%; max-width:460px; box-shadow:0 20px 60px rgba(0,0,0,0.2); }
.modal-sm { max-width:380px; }
.modal-header { display:flex; justify-content:space-between; align-items:center; padding:20px 24px 16px; border-bottom:1px solid #F1F5F9; }
.modal-header h2 { font-size:16px; font-weight:700; color:#0F2E5A; margin:0; }
.modal-close { background:none; border:none; font-size:18px; color:#94A3B8; cursor:pointer; }
.modal-body { padding:20px 24px; display:flex; flex-direction:column; gap:16px; }
.modal-body p { font-size:14px; color:#374151; margin:0; line-height:1.6; }
.modal-footer { display:flex; justify-content:flex-end; gap:10px; padding:16px 24px; border-top:1px solid #F1F5F9; }
.modal-error { font-size:12px; color:#EF4444; background:#FFF5F5; padding:8px 12px; border-radius:6px; }

.field-group { display:flex; flex-direction:column; gap:5px; }
.field-group label { font-size:13px; font-weight:600; color:#374151; }
.req { color:#EF4444; }
.field-input { padding:9px 12px; border:1.5px solid #E2E8F0; border-radius:8px; font-size:13px; color:#1E293B; background:#F8FAFC; width:100%; box-sizing:border-box; }
.field-input:focus { outline:none; border-color:#E87722; background:#fff; }

.btn-cancel { padding:8px 16px; background:none; border:1.5px solid #E2E8F0; color:#64748B; border-radius:8px; font-size:13px; cursor:pointer; }
.btn-submit { padding:8px 20px; background:#E87722; color:#fff; border:none; border-radius:8px; font-size:13px; font-weight:600; cursor:pointer; }
.btn-submit:hover:not(:disabled) { background:#D4691A; }
.btn-submit:disabled { opacity:0.5; cursor:not-allowed; }
.btn-delete-confirm { padding:8px 20px; background:#EF4444; color:#fff; border:none; border-radius:8px; font-size:13px; font-weight:600; cursor:pointer; }
.btn-delete-confirm:hover:not(:disabled) { background:#DC2626; }
  `]
})
export class UsersAdminComponent implements OnInit {
  private http = inject(HttpClient);

  users: AdminUser[] = [];
  loading = true;
  saving  = false;
  currentUserId = 0;

  successMsg = ''; errorMsg = '';
  showModal = false; showDeleteModal = false;
  editMode  = false;
  modalError = '';
  userToDelete: AdminUser | null = null;
  editingId = 0;

  form = { username: '', full_name: '', email: '', password: '', is_active: true };

  private get headers() {
    return new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('edo_token')}` });
  }

  ngOnInit() {
    // Obtener ID del usuario actual desde el backend
    this.http.get<any>(`${environment.apiUrl}/auth/me`, { headers: this.headers }).subscribe({
      next: me => { this.currentUserId = me.id || 0; },
      error: () => {}
    });
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.http.get<AdminUser[]>(`${environment.apiUrl}/auth/users`, { headers: this.headers }).subscribe({
      next: data => { this.users = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  openCreate() {
    this.editMode = false; this.modalError = '';
    this.form = { username: '', full_name: '', email: '', password: '', is_active: true };
    this.showModal = true;
  }

  openEdit(u: AdminUser) {
    this.editMode = true; this.editingId = u.id; this.modalError = '';
    this.form = { username: u.username, full_name: u.full_name, email: u.email, password: '', is_active: u.is_active };
    this.showModal = true;
  }

  closeModal() { this.showModal = false; }

  submitForm() {
    this.modalError = '';
    if (!this.form.username.trim()) { this.modalError = 'El usuario es requerido'; return; }
    if (!this.editMode && !this.form.password) { this.modalError = 'La contraseña es requerida'; return; }

    this.saving = true;
    const body: any = {
      username: this.form.username, full_name: this.form.full_name,
      email: this.form.email, is_active: this.form.is_active
    };
    if (this.form.password) body[this.editMode ? 'new_password' : 'password'] = this.form.password;

    const req = this.editMode
      ? this.http.put(`${environment.apiUrl}/auth/users/${this.editingId}`, body, { headers: this.headers })
      : this.http.post(`${environment.apiUrl}/auth/users`, body, { headers: this.headers });

    req.subscribe({
      next: () => {
        this.saving = false; this.showModal = false;
        this.successMsg = this.editMode ? 'Usuario actualizado' : 'Usuario creado';
        setTimeout(() => this.successMsg = '', 3000);
        this.loadUsers();
      },
      error: (err) => {
        this.saving = false;
        this.modalError = err.error?.error || 'Error al guardar';
      }
    });
  }

  confirmDelete(u: AdminUser) { this.userToDelete = u; this.showDeleteModal = true; }

  deleteUser() {
    if (!this.userToDelete) return;
    this.saving = true;
    this.http.delete(`${environment.apiUrl}/auth/users/${this.userToDelete.id}`, { headers: this.headers }).subscribe({
      next: () => {
        this.saving = false; this.showDeleteModal = false; this.userToDelete = null;
        this.successMsg = 'Usuario eliminado';
        setTimeout(() => this.successMsg = '', 3000);
        this.loadUsers();
      },
      error: (err) => {
        this.saving = false;
        this.errorMsg = err.error?.error || 'Error al eliminar';
        setTimeout(() => this.errorMsg = '', 4000);
      }
    });
  }
}
