import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  private api = inject(ApiService);

  messages: any[] = [];
  loading   = true;
  selected: any = null;
  filter = 'todos';  // todos | no_leidos

  get filtered() {
    return this.filter === 'no_leidos'
      ? this.messages.filter(m => !m.read)
      : this.messages;
  }

  get unreadCount() { return this.messages.filter(m => !m.read).length; }

  ngOnInit() {
    this.api.getMessages().subscribe({
      next: r => { this.messages = r; this.loading = false; },
      error: () => this.loading = false,
    });
  }

  open(m: any) {
    this.selected = m;
    if (!m.read) this.api.markRead(m.id).subscribe({ next: () => m.read = true });
  }

  close() { this.selected = null; }

  waReply(m: any) {
    if (!m.phone && !m.email) return null;
    const msg = `Hola ${m.name}, recibimos su mensaje sobre "${m.projectType || 'su proyecto'}" y queremos conversar con usted.`;
    return m.phone
      ? `https://wa.me/57${m.phone.replace(/\D/g,'')}?text=${encodeURIComponent(msg)}`
      : null;
  }

  mailReply(m: any) {
    const sub = encodeURIComponent(`Re: ${m.projectType || 'Consulta'} - EDO Ingeniería Digital`);
    const body = encodeURIComponent(`Hola ${m.name},\n\nGracias por contactarnos.\n\n`);
    return `mailto:${m.email}?subject=${sub}&body=${body}`;
  }

  formatDate(d: string) {
    if (!d) return '';
    return new Date(d).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }
}
