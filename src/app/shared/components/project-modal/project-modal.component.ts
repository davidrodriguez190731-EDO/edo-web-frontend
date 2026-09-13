import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';

/**
 * Modal de proyecto, compartido por el Inicio y el Portafolio.
 *
 * POR QUE EXISTE:
 *   El modal estaba escrito dos veces, una en cada pagina. Se mejoro el del
 *   portafolio y el del inicio quedo con la version anterior: distinta
 *   galeria, distintos botones y sin los campos nuevos. Mientras fueran dos
 *   copias, cada cambio habia que hacerlo dos veces y seguirian divergiendo.
 */
@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="modal-backdrop" *ngIf="project" (click)="cerrar()">
  <div class="modal" (click)="$event.stopPropagation()" [style.--accent]="project.color">

    <div class="modal-left">
      <div class="modal-gallery" *ngIf="project.images?.length; else sinFotos">
        <div class="mgallery-viewport">
          <div class="mgallery-counter" *ngIf="project.images.length > 1">
            {{ imgIndex + 1 }} / {{ project.images.length }}
          </div>
          <div class="mgallery-track" [style.transform]="'translateX(-' + (imgIndex * 100) + '%)'">
            <img *ngFor="let img of project.images" [src]="imgUrl(img)" alt="{{ project.name }}">
          </div>
          <button class="mgallery-arrow mgallery-arrow--prev" *ngIf="project.images.length > 1"
                  (click)="prev(); $event.stopPropagation()" aria-label="Anterior">&#8249;</button>
          <button class="mgallery-arrow mgallery-arrow--next" *ngIf="project.images.length > 1"
                  (click)="next(); $event.stopPropagation()" aria-label="Siguiente">&#8250;</button>
        </div>
        <div class="mgallery-thumbs" *ngIf="project.images.length > 1">
          <button *ngFor="let img of project.images; let i = index"
                  [class.is-active]="i === imgIndex"
                  (click)="imgIndex = i; $event.stopPropagation()">
            <img [src]="imgUrl(img)" alt="Vista {{ i + 1 }}">
          </button>
        </div>
      </div>
      <ng-template #sinFotos>
        <div class="modal-gallery-placeholder"
             [style.background]="'linear-gradient(135deg,' + project.color + '33 0%,' + project.color + '66 100%)'">
          <span style="font-size:64px">{{ icono(project.category) }}</span>
        </div>
      </ng-template>
    </div>

    <div class="modal-right">
      <button class="modal-close" (click)="cerrar()">&#x2715;</button>

      <div class="modal-body">
        <div class="modal-meta">
          <span class="modal-kind"
                [class.modal-kind--producto]="project.kind !== 'caso'"
                [class.modal-kind--caso]="project.kind === 'caso'">
            {{ project.kind === 'caso' ? 'Caso de éxito' : 'Producto propio' }}
          </span>
          <span class="modal-category">{{ project.category }}</span>
          <span class="modal-status" [class.is-prod]="project.status === 'En producción'">
            <span class="sdot"></span>{{ project.status }}
          </span>
        </div>

        <h2 class="modal-title">{{ project.name }}</h2>
        <div class="modal-client" *ngIf="project.client || project.year">
          <ng-container *ngIf="project.client">Para {{ project.client }}</ng-container>
          <ng-container *ngIf="project.client && project.year"> · </ng-container>
          <ng-container *ngIf="project.year">{{ project.year }}</ng-container>
        </div>

        <p class="modal-desc">{{ project.description }}</p>

        <div class="modal-highlights" *ngIf="project.highlights?.length">
          <div class="modal-section-label">Funcionalidades clave</div>
          <ul>
            <li *ngFor="let h of project.highlights">
              <span class="hcheck">&#x2713;</span>{{ h }}
            </li>
          </ul>
        </div>

        <div class="modal-metrics" *ngIf="project.metrics?.length">
          <div class="modal-section-label">Resultados</div>
          <ul><li *ngFor="let m of project.metrics">{{ m }}</li></ul>
        </div>
      </div>

      <div class="modal-cta-sticky">
        <a *ngIf="project.url_app" [href]="project.url_app" target="_blank" rel="noopener"
           class="btn-cta-primary">
          {{ project.kind === 'caso' ? 'Ver el sitio' : 'Ver la aplicación' }} &#8599;
        </a>
        <a [href]="waLink()" target="_blank" rel="noopener" class="btn-cta-wa">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
            <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.08-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.09 3.2 5.07 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z"/>
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.13h-.01a8.2 8.2 0 01-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 01-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24a8.24 8.24 0 018.24 8.25c0 4.54-3.7 8.24-8.24 8.24z"/>
          </svg>
          Escribir por WhatsApp
        </a>
        <button class="btn-cta-secondary" (click)="cerrar()">Cerrar</button>
      </div>
    </div>

  </div>
</div>
`,
  styles: [`
/* CSS plano a proposito: los estilos en linea de un componente Angular se
   procesan como CSS, no como SCSS. La anidacion tipo "&--prev" no se
   compila y esas reglas quedaban sin aplicar. */
:host { display: contents; }

.modal-backdrop {
  /* Por encima del boton flotante de WhatsApp, que tiene z-index 9999 y
     se montaba sobre el modal tapando la galeria y los botones. */
  position: fixed; inset: 0; z-index: 10000;
  background: rgba(10,22,40,0.82); backdrop-filter: blur(6px);
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
  animation: mFade 0.2s ease;
}
@keyframes mFade { from { opacity: 0; } to { opacity: 1; } }
@keyframes mUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

.modal {
  background: #fff; border-radius: 22px;
  width: 100%; max-width: 1080px; max-height: 88vh;
  display: grid; grid-template-columns: 1.15fr 1fr;
  overflow: hidden; position: relative;
  animation: mUp 0.25s ease;
  box-shadow: 0 40px 90px rgba(10,22,40,0.45);
  font-family: inherit;
}

.modal-left {
  background: #0A1628;
  display: flex; flex-direction: column; justify-content: center;
  min-width: 0; max-height: 88vh;
}

.modal-gallery {
  position: relative; width: 100%; min-height: 0;
  display: flex; flex-direction: column; justify-content: center;
}

.mgallery-viewport {
  position: relative; width: 100%; aspect-ratio: 16 / 9;
  flex: 0 0 auto; overflow: hidden;
  display: flex; align-items: center;
}

.mgallery-track {
  display: flex; width: 100%; height: 100%;
  transition: transform 0.35s ease;
}
.mgallery-track img {
  min-width: 100%; width: 100%; height: 100%; object-fit: contain;
}

.mgallery-arrow {
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 38px; height: 38px; border-radius: 50%;
  background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2);
  color: #fff; font-size: 20px; line-height: 1; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(6px); z-index: 3; transition: background 0.2s;
}
.mgallery-arrow:hover { background: rgba(232,119,34,0.85); border-color: transparent; }
.mgallery-arrow--prev { left: 12px; }
.mgallery-arrow--next { right: 12px; }

.mgallery-counter {
  position: absolute; top: 14px; left: 14px; z-index: 3;
  background: rgba(10,22,40,0.7); color: rgba(255,255,255,0.85);
  font-size: 11px; font-weight: 700; letter-spacing: 0.5px;
  padding: 5px 11px; border-radius: 100px; backdrop-filter: blur(4px);
}

.mgallery-thumbs {
  display: flex; gap: 8px; padding: 10px 12px;
  overflow-x: auto; flex-shrink: 0;
  background: rgba(255,255,255,0.04);
  border-top: 1px solid rgba(255,255,255,0.08);
}
.mgallery-thumbs button {
  flex-shrink: 0; width: 62px; height: 42px; padding: 0;
  border-radius: 6px; overflow: hidden; cursor: pointer;
  border: 2px solid transparent; background: #0A1628;
  opacity: 0.55; transition: opacity 0.2s, border-color 0.2s;
}
.mgallery-thumbs button img { width: 100%; height: 100%; object-fit: cover; display: block; }
.mgallery-thumbs button:hover { opacity: 0.85; }
.mgallery-thumbs button.is-active { opacity: 1; border-color: #E87722; }

.modal-gallery-placeholder {
  flex: 1; display: flex; align-items: center; justify-content: center;
}

.modal-right {
  display: flex; flex-direction: column;
  min-width: 0; max-height: 88vh;
  position: relative; background: #fff;
}

.modal-close {
  position: absolute; top: 14px; right: 14px; z-index: 10;
  background: #F1F5F9; border: none; border-radius: 50%;
  width: 32px; height: 32px; font-size: 14px; color: #64748B;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
}
.modal-close:hover { background: #E2E8F0; color: #0F2E5A; }

.modal-body { flex: 1; overflow-y: auto; padding: 30px 28px 24px; }

.modal-meta {
  display: flex; align-items: center; gap: 10px;
  flex-wrap: wrap; margin-bottom: 14px; padding-right: 40px;
}

.modal-kind {
  font-size: 10px; font-weight: 800; letter-spacing: 0.8px;
  text-transform: uppercase; padding: 4px 10px; border-radius: 100px;
}
.modal-kind--producto { background: rgba(232,119,34,0.12); color: #C05621; }
.modal-kind--caso     { background: rgba(27,75,138,0.10);  color: #1B4B8A; }

.modal-category {
  font-size: 10px; font-weight: 700; color: #E87722;
  text-transform: uppercase; letter-spacing: 0.08em;
}

.modal-status {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 10px; font-weight: 700; color: #64748B;
  text-transform: uppercase; letter-spacing: 0.06em;
}
.modal-status .sdot { width: 6px; height: 6px; border-radius: 50%; background: #94A3B8; }
.modal-status.is-prod { color: #276749; }
.modal-status.is-prod .sdot { background: #38A169; }

.modal-title { font-size: 26px; font-weight: 900; color: #0F2E5A; margin: 0 0 6px; line-height: 1.2; }
.modal-client { font-size: 12px; color: #94A3B8; margin-bottom: 16px; }
.modal-desc { font-size: 14px; color: #475569; line-height: 1.75; margin-bottom: 22px; }

.modal-section-label {
  font-size: 11px; font-weight: 800; color: #94A3B8;
  text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 12px;
}

.modal-highlights { margin-bottom: 22px; }
.modal-highlights ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 9px; }
.modal-highlights li { display: flex; align-items: flex-start; gap: 9px; font-size: 13.5px; color: #475569; line-height: 1.55; }
.modal-highlights .hcheck { color: var(--accent, #E87722); font-weight: 700; flex-shrink: 0; }

.modal-metrics {
  background: #F7F9FC; border-radius: 12px; padding: 16px 18px;
  border-left: 3px solid var(--accent, #E87722);
}
.modal-metrics ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
.modal-metrics li { font-size: 13px; color: #0F2E5A; font-weight: 600; line-height: 1.5; }

.modal-cta-sticky {
  flex-shrink: 0; padding: 14px 24px 18px;
  border-top: 1px solid #F1F5F9;
  display: flex; gap: 10px; background: #fff;
  box-shadow: 0 -4px 16px rgba(0,0,0,0.05);
}
.modal-cta-sticky .btn-cta-primary,
.modal-cta-sticky .btn-cta-wa {
  flex: 1 1 0; min-width: 0;
  padding: 13px 12px; border: none; border-radius: 10px;
  font-weight: 700; font-size: 13.5px; font-family: inherit;
  cursor: pointer; text-decoration: none; text-align: center;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  white-space: nowrap; transition: background 0.2s;
}
.modal-cta-sticky svg { flex-shrink: 0; }
.modal-cta-sticky .btn-cta-primary { background: #0F2E5A; color: #fff; }
.modal-cta-sticky .btn-cta-primary:hover { background: #0A1628; }
.modal-cta-sticky .btn-cta-wa { background: #25D366; color: #fff; }
.modal-cta-sticky .btn-cta-wa:hover { background: #1EBE5A; }
.modal-cta-sticky .btn-cta-secondary {
  padding: 13px 14px; background: transparent; color: #94A3B8;
  border: none; border-radius: 10px; font-weight: 600; font-size: 13px;
  font-family: inherit; cursor: pointer; flex: 0 0 auto;
}
.modal-cta-sticky .btn-cta-secondary:hover { color: #475569; background: #F1F5F9; }

@media (max-width: 860px) {
  .modal-backdrop { padding: 12px; }
  .modal { grid-template-columns: 1fr; grid-template-rows: auto minmax(0, 1fr); max-height: 92vh; }
  .modal-left { max-height: none; border-radius: 22px 22px 0 0; }
  /* min-height: 0 es lo que permite que el cuerpo haga scroll dentro del
     modal. Sin eso la columna crece con el contenido y el pie con los
     botones queda fuera de la pantalla, imposible de alcanzar. */
  .modal-right { max-height: none; min-height: 0; overflow: hidden; }
  .modal-body { padding: 22px 20px 18px; min-height: 0; }
  .modal-title { font-size: 21px; }
  .mgallery-thumbs { display: none; }
  .modal-cta-sticky { padding: 12px 14px 14px; gap: 8px; }
  .modal-cta-sticky .btn-cta-primary,
  .modal-cta-sticky .btn-cta-wa { font-size: 12.5px; padding: 12px 8px; gap: 6px; }
  .modal-cta-sticky .btn-cta-secondary { display: none; }
}
`],
})
export class ProjectModalComponent {
  private _project: any = null;

  @Input()
  set project(value: any) {
    this._project = value;
    this.imgIndex = 0;
    document.body.style.overflow = value ? 'hidden' : '';
  }
  get project(): any { return this._project; }

  @Output() closed = new EventEmitter<void>();

  imgIndex = 0;

  imgUrl(v: string): string {
    if (!v) return '';
    if (v.startsWith('data:') || v.startsWith('http')) return v;
    return environment.apiUrl.replace('/api', '') + v;
  }

  prev() {
    const n = this.project?.images?.length;
    if (!n) return;
    this.imgIndex = (this.imgIndex - 1 + n) % n;
  }

  next() {
    const n = this.project?.images?.length;
    if (!n) return;
    this.imgIndex = (this.imgIndex + 1) % n;
  }

  icono(cat: string): string {
    const map: Record<string, string> = {
      'Mantenimiento': '🔧', 'E-commerce': '🛒', 'Web': '🌐',
      'App': '📱', 'Dashboard': '📊', 'Automatización': '⚡',
    };
    return map[cat] ?? '💻';
  }

  waLink(): string {
    const nombre = this.project?.name ?? '';
    const msg = this.project?.kind === 'caso'
      ? `Hola, vi el caso "${nombre}" en su portafolio y quiero algo similar para mi empresa.`
      : `Hola, me interesa ${nombre}. ¿Podemos hablar?`;
    return `https://wa.me/573217733352?text=${encodeURIComponent(msg)}`;
  }

  cerrar() {
    document.body.style.overflow = '';
    this.closed.emit();
  }

  @HostListener('document:keydown.escape')
  onEsc() { if (this.project) this.cerrar(); }
}
