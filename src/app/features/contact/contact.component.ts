import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  private http = inject(HttpClient);

  sending  = false;
  sent     = false;
  error    = '';

  particles: { x: number; y: number; size: number; delay: number; duration: number }[] = [];

  form = {
    name: '', company: '', email: '', projectType: '', message: ''
  };

  projectTypes = [
    'Sistema a la medida',
    'P\u00e1gina web profesional',
    'App m\u00f3vil PWA',
    'App web de gesti\u00f3n',
    'Automatizaci\u00f3n de procesos',
    'Otro',
  ];

  contactData = {
    email:    'contacto@edoingenieriadigital.com',
    phone:    '+57 321 773 3352',
    whatsapp: '573217733352',
    address:  'Monter\u00eda, C\u00f3rdoba',
    city:     'Monter\u00eda, C\u00f3rdoba, Colombia',
    schedule: 'Lunes a viernes 8am - 6pm',
  };

  socials = { instagram: '', tiktok: '', facebook: '', linkedin: '' };

  ngOnInit() {
    this.particles = Array.from({ length: 14 }, () => ({
      x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 4,
      duration: Math.random() * 6 + 5,
    }));
    this.loadConfig();
  }

  loadConfig() {
    this.http.get<any>(`${environment.apiUrl}/site-config/`).subscribe({
      next: cfg => {
        if (cfg.contact_email)    this.contactData.email    = cfg.contact_email;
        if (cfg.contact_phone)    this.contactData.phone    = cfg.contact_phone;
        if (cfg.contact_whatsapp) this.contactData.whatsapp = cfg.contact_whatsapp;
        if (cfg.contact_address)  this.contactData.address  = cfg.contact_address;
        if (cfg.contact_city)     this.contactData.city     = cfg.contact_city;
        if (cfg.contact_schedule) this.contactData.schedule = cfg.contact_schedule;
        this.socials = {
          instagram: cfg['social_instagram'] || '',
          tiktok:    cfg['social_tiktok']    || '',
          facebook:  cfg['social_facebook']  || '',
          linkedin:  cfg['social_linkedin']  || ''
        };
      }
    });
  }

  get waLink(): string {
    return `https://wa.me/${this.contactData.whatsapp}?text=Hola%2C%20me%20gustar%C3%ADa%20hablar%20sobre%20mi%20proyecto`;
  }

  submit() {
    if (!this.form.name || !this.form.email || !this.form.message) {
      this.error = 'Por favor complete nombre, email y mensaje.';
      return;
    }
    this.sending = true;
    this.error   = '';
    this.http.post(`${environment.apiUrl}/contact/`, this.form).subscribe({
      next: () => {
        this.sending = false;
        this.sent    = true;
        this.form    = { name: '', company: '', email: '', projectType: '', message: '' };
      },
      error: () => {
        this.sending = false;
        this.error   = 'Error al enviar. Intente de nuevo o escr\u00edbanos por WhatsApp.';
      }
    });
  }
}
