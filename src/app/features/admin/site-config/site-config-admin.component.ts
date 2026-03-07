import { Component, OnInit, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-site-config',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="config-page">

      <div class="config-header">
        <a routerLink="/admin" class="back-link">← Volver al panel</a>
        <h1>Configuración del Hero</h1>
        <p>Suba las imágenes que se mostrarán en el slider de la página de inicio.</p>
      </div>

      <!-- Alerta -->
      <div class="alert alert-success" *ngIf="successMsg">✓ {{ successMsg }}</div>
      <div class="alert alert-error"   *ngIf="errorMsg">✗ {{ errorMsg }}</div>

      <div class="images-grid">

        <!-- Imagen CAOS -->
        <div class="image-card">
          <div class="image-card-header chaos">
            <span class="card-badge">Sin sistema</span>
            <h3>Imagen "Caos Operativo"</h3>
            <p>Muestra el estado sin sistema: papeles, WhatsApp, desorden.</p>
          </div>

          <div class="image-preview-area" (click)="triggerUpload('chaos')" [class.has-image]="chaosPreview">
            <img *ngIf="chaosPreview" [src]="chaosPreview" alt="Caos preview" class="preview-img">
            <div *ngIf="!chaosPreview" class="upload-placeholder">
              <span class="upload-icon">📁</span>
              <span>Clic para subir imagen</span>
              <span class="upload-hint">JPG, PNG o WEBP · máx 5MB</span>
            </div>
          </div>

          <input #chaosFileInput type="file" accept="image/*" style="display:none"
                 (change)="onFileSelected($event, 'chaos')">

          <div class="card-actions">
            <button class="btn-upload" (click)="triggerUpload('chaos')">
              📤 Seleccionar imagen
            </button>
            <button class="btn-save chaos-btn" [disabled]="!chaosPending || saving"
                    (click)="saveImage('chaos')">
              {{ saving && activeKey === 'chaos' ? 'Guardando...' : '💾 Guardar' }}
            </button>
            <button class="btn-delete" *ngIf="chaosPreview && !chaosPending"
                    (click)="deleteImage('hero_chaos_image')">
              🗑 Eliminar
            </button>
          </div>
        </div>

        <!-- Imagen ORDEN -->
        <div class="image-card">
          <div class="image-card-header order">
            <span class="card-badge">Con EDO</span>
            <h3>Imagen "Trabajo Organizado"</h3>
            <p>Muestra el estado con sistema: dashboard, control, eficiencia.</p>
          </div>

          <div class="image-preview-area" (click)="triggerUpload('order')" [class.has-image]="orderPreview">
            <img *ngIf="orderPreview" [src]="orderPreview" alt="Orden preview" class="preview-img">
            <div *ngIf="!orderPreview" class="upload-placeholder">
              <span class="upload-icon">📁</span>
              <span>Clic para subir imagen</span>
              <span class="upload-hint">JPG, PNG o WEBP · máx 5MB</span>
            </div>
          </div>

          <input #orderFileInput type="file" accept="image/*" style="display:none"
                 (change)="onFileSelected($event, 'order')">

          <div class="card-actions">
            <button class="btn-upload" (click)="triggerUpload('order')">
              📤 Seleccionar imagen
            </button>
            <button class="btn-save order-btn" [disabled]="!orderPending || saving"
                    (click)="saveImage('order')">
              {{ saving && activeKey === 'order' ? 'Guardando...' : '💾 Guardar' }}
            </button>
            <button class="btn-delete" *ngIf="orderPreview && !orderPending"
                    (click)="deleteImage('hero_order_image')">
              🗑 Eliminar
            </button>
          </div>
        </div>

      </div>

      <!-- Info -->
      <div class="info-box">
        <h4>💡 Recomendaciones</h4>
        <ul>
          <li>Tamaño ideal: <strong>800 × 500 px</strong> o superior</li>
          <li>Formato: JPG o WEBP para mejor rendimiento</li>
          <li>La imagen de "Caos" debe mostrar desorden, papeles o personas estresadas</li>
          <li>La imagen de "Con EDO" debe mostrar un dashboard, sistema o trabajo organizado</li>
          <li>Si no sube imágenes, el hero muestra la ilustración SVG por defecto</li>
        </ul>
      </div>

    </div>
  `,
  styles: [`
    .config-page {
      max-width: 900px;
      margin: 0 auto;
      padding: 32px 24px;
    }

    .config-header {
      margin-bottom: 32px;
      h1 { font-size: 28px; font-weight: 800; color: #0F2E5A; margin: 8px 0; }
      p  { color: #64748B; font-size: 14px; }
    }

    .back-link {
      font-size: 13px; color: #1B4B8A; text-decoration: none; font-weight: 600;
      &:hover { color: #0F2E5A; }
    }

    .alert {
      padding: 12px 18px; border-radius: 8px; font-size: 14px;
      font-weight: 600; margin-bottom: 20px;
      &.alert-success { background: rgba(56,161,105,0.1); color: #276749; border: 1px solid rgba(56,161,105,0.3); }
      &.alert-error   { background: rgba(229,62,62,0.1);  color: #9B2C2C; border: 1px solid rgba(229,62,62,0.3); }
    }

    .images-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 32px;
    }

    .image-card {
      background: #fff;
      border: 1px solid #E2E8F0;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }

    .image-card-header {
      padding: 20px;
      &.chaos { background: rgba(229,62,62,0.05); border-bottom: 1px solid rgba(229,62,62,0.1); }
      &.order { background: rgba(56,161,105,0.05); border-bottom: 1px solid rgba(56,161,105,0.1); }
      h3 { font-size: 15px; font-weight: 700; color: #0F2E5A; margin: 6px 0 4px; }
      p  { font-size: 12px; color: #64748B; margin: 0; }
    }

    .card-badge {
      font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 100px;
      .chaos & { background: rgba(229,62,62,0.1); color: #C53030; }
      .order & { background: rgba(56,161,105,0.1); color: #276749; }
    }

    .image-preview-area {
      height: 200px;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; background: #F7F9FC;
      border-bottom: 1px solid #E2E8F0;
      transition: background 0.2s;
      &:hover { background: #EEF2FF; }
      &.has-image { background: #000; }
    }

    .preview-img {
      width: 100%; height: 100%; object-fit: cover;
      opacity: 0.9;
    }

    .upload-placeholder {
      display: flex; flex-direction: column; align-items: center;
      gap: 8px; color: #94A3B8;
      .upload-icon { font-size: 36px; }
      span { font-size: 13px; font-weight: 500; }
      .upload-hint { font-size: 11px; color: #CBD5E0; }
    }

    .card-actions {
      padding: 16px 20px;
      display: flex; gap: 8px; flex-wrap: wrap;
    }

    button {
      font-family: inherit; cursor: pointer;
      font-size: 13px; font-weight: 600;
      padding: 8px 16px; border-radius: 8px;
      border: none; transition: all 0.2s;
      &:disabled { opacity: 0.5; cursor: not-allowed; }
    }

    .btn-upload {
      background: #F1F5F9; color: #475569;
      border: 1px solid #E2E8F0;
      &:hover { background: #E2E8F0; }
    }

    .btn-save {
      color: #fff;
      &.chaos-btn { background: #E53E3E; &:not(:disabled):hover { background: #C53030; } }
      &.order-btn { background: #38A169; &:not(:disabled):hover { background: #276749; } }
    }

    .btn-delete {
      background: transparent; color: #94A3B8;
      border: 1px solid #E2E8F0;
      margin-left: auto;
      &:hover { color: #E53E3E; border-color: #E53E3E; }
    }

    .info-box {
      background: #F0F7FF; border: 1px solid #BEE3F8;
      border-radius: 12px; padding: 20px 24px;
      h4 { font-size: 14px; font-weight: 700; color: #1B4B8A; margin: 0 0 12px; }
      ul { margin: 0; padding-left: 20px; }
      li { font-size: 13px; color: #4A5568; margin-bottom: 6px; line-height: 1.5; }
    }

    @media (max-width: 640px) {
      .images-grid { grid-template-columns: 1fr; }
    }
  `],
})
export class SiteConfigAdminComponent implements OnInit {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  chaosPreview: string | null = null;
  orderPreview: string | null = null;
  chaosPending: string | null = null; // base64 listo para subir
  orderPending: string | null = null;
  chaosPendingName = '';
  orderPendingName = '';

  @ViewChild('chaosFileInput') chaosFileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('orderFileInput') orderFileInput!: ElementRef<HTMLInputElement>;

  saving    = false;
  activeKey = '';
  successMsg = '';
  errorMsg   = '';

  // eliminadas: chaosInputEl, orderInputEl (ya no se usan)

  ngOnInit() {
    this.loadCurrentImages();
  }

  loadCurrentImages() {
    this.http.get<any>(`${this.apiUrl}/site-config/`).subscribe({
      next: cfg => {
        if (cfg.hero_chaos_image) this.chaosPreview = this.apiUrl.replace('/api', '') + cfg.hero_chaos_image;
        if (cfg.hero_order_image) this.orderPreview = this.apiUrl.replace('/api', '') + cfg.hero_order_image;
      }
    });
  }

  triggerUpload(side: 'chaos' | 'order') {
    if (side === 'chaos') {
      this.chaosFileInput.nativeElement.click();
    } else {
      this.orderFileInput.nativeElement.click();
    }
  }

  onFileSelected(event: Event, side: 'chaos' | 'order') {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      this.showError('La imagen no puede superar 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const b64 = e.target?.result as string;
      if (side === 'chaos') {
        this.chaosPreview  = b64;
        this.chaosPending  = b64;
        this.chaosPendingName = file.name;
      } else {
        this.orderPreview  = b64;
        this.orderPending  = b64;
        this.orderPendingName = file.name;
      }
    };
    reader.readAsDataURL(file);
  }

  saveImage(side: 'chaos' | 'order') {
    const key      = side === 'chaos' ? 'hero_chaos_image' : 'hero_order_image';
    const b64      = side === 'chaos' ? this.chaosPending  : this.orderPending;
    const filename = side === 'chaos' ? this.chaosPendingName : this.orderPendingName;

    if (!b64) return;

    this.saving    = true;
    this.activeKey = side;
    this.clearMessages();

    const token = localStorage.getItem('edo_token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.post<any>(`${this.apiUrl}/site-config/upload-image`, { key, file: b64, filename }, { headers })
      .subscribe({
        next: (res) => {
          this.saving = false;
          if (side === 'chaos') this.chaosPending = null;
          else                  this.orderPending = null;
          this.showSuccess('Imagen guardada correctamente');
        },
        error: () => {
          this.saving = false;
          this.showError('Error al guardar la imagen');
        }
      });
  }

  deleteImage(key: string) {
    if (!confirm('¿Eliminar esta imagen?')) return;
    const token = localStorage.getItem('edo_token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.delete(`${this.apiUrl}/site-config/image/${key}`, { headers }).subscribe({
      next: () => {
        if (key === 'hero_chaos_image') { this.chaosPreview = null; this.chaosPending = null; }
        else                            { this.orderPreview = null; this.orderPending = null; }
        this.showSuccess('Imagen eliminada');
      }
    });
  }

  private showSuccess(msg: string) {
    this.successMsg = msg;
    setTimeout(() => this.successMsg = '', 4000);
  }

  private showError(msg: string) {
    this.errorMsg = msg;
    setTimeout(() => this.errorMsg = '', 4000);
  }

  private clearMessages() {
    this.successMsg = '';
    this.errorMsg   = '';
  }
}
