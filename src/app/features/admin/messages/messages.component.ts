import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="admin-page">
  <div class="page-header">
    <div>
      <h1>Mensajes de contacto</h1>
      <p>{{ messages.length }} mensajes recibidos</p>
    </div>
  </div>

  <div *ngIf="loading" class="loading-state">Cargando mensajes...</div>

  <div *ngIf="!loading" style="display:flex;flex-direction:column;gap:14px;">
    <div *ngFor="let m of messages" class="msg-card" [class.msg-unread]="!m.read" (click)="markRead(m)">
      <div class="msg-header">
        <div>
          <span class="msg-name">{{ m.name }}</span>
          <span class="msg-company" *ngIf="m.company"> · {{ m.company }}</span>
        </div>
        <div style="display:flex;gap:10px;align-items:center;">
          <span class="msg-date">{{ m.date }}</span>
          <span *ngIf="!m.read" class="unread-dot"></span>
        </div>
      </div>
      <div class="msg-email">📧 {{ m.email }}</div>
      <div *ngIf="m.projectType" class="msg-type">🏷️ {{ m.projectType }}</div>
      <div class="msg-body">{{ m.message }}</div>
    </div>
    <div *ngIf="messages.length === 0" class="empty-state">No hay mensajes todavía.</div>
  </div>
</div>
  `,
  styles: [`
    .msg-card {
      background: #fff; border: 1px solid #E2E8F0; border-radius: 14px;
      padding: 20px 24px; cursor: pointer; transition: all 0.2s;
      &:hover { box-shadow: 0 4px 16px rgba(27,75,138,0.1); }
      &.msg-unread { border-left: 3px solid #1B4B8A; background: #F7FBFF; }
    }
    .msg-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }
    .msg-name { font-size:15px; font-weight:700; color:#0F2E5A; }
    .msg-company { font-size:14px; color:#718096; }
    .msg-date { font-size:12px; color:#A0AEC0; }
    .msg-email { font-size:13px; color:#718096; margin-bottom:4px; }
    .msg-type { font-size:13px; color:#1B4B8A; font-weight:600; margin-bottom:8px; }
    .msg-body { font-size:14px; color:#4A5568; line-height:1.6; }
    .unread-dot { width:8px; height:8px; background:#1B4B8A; border-radius:50%; flex-shrink:0; }
  `],
})
export class MessagesComponent implements OnInit {
  private api = inject(ApiService);
  messages: any[] = [];
  loading = true;

  ngOnInit() {
    this.api.getMessages().subscribe({
      next: r => { this.messages = r; this.loading = false; },
      error: () => this.loading = false,
    });
  }

  markRead(m: any) {
    if (m.read) return;
    this.api.markRead(m.id).subscribe({ next: () => m.read = true });
  }
}
