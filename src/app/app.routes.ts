import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // ── Público ──────────────────────────────────────────────
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'servicios',
    loadComponent: () =>
      import('./features/services/services.component').then(m => m.ServicesComponent),
  },
  {
    path: 'portafolio',
    loadComponent: () =>
      import('./features/portfolio/portfolio.component').then(m => m.PortfolioComponent),
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./features/blog/blog-list/blog-list.component').then(m => m.BlogListComponent),
  },
  {
    path: 'blog/:id',
    loadComponent: () =>
      import('./features/blog/blog-detail/blog-detail.component').then(m => m.BlogDetailComponent),
  },
  {
    path: 'contacto',
    loadComponent: () =>
      import('./features/contact/contact.component').then(m => m.ContactComponent),
  },

  // ── Admin ────────────────────────────────────────────────
  {
    path: 'admin/login',
    loadComponent: () =>
      import('./features/admin/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'proyectos',
        pathMatch: 'full',
      },
      {
        path: 'proyectos',
        loadComponent: () =>
          import('./features/admin/projects/projects-admin.component').then(m => m.ProjectsAdminComponent),
      },
      {
        path: 'blog',
        loadComponent: () =>
          import('./features/admin/blog-admin/blog-admin.component').then(m => m.BlogAdminComponent),
      },
      {
        path: 'mensajes',
        loadComponent: () =>
          import('./features/admin/messages/messages.component').then(m => m.MessagesComponent),
      },
    ],
  },

  { path: '**', redirectTo: '' },
];
