import os

pages = [
    ('src/app/features/portfolio',            'portfolio.component.ts',              'PortfolioComponent',   'portfolio'),
    ('src/app/features/services',             'services.component.ts',               'ServicesComponent',    'services'),
    ('src/app/features/contact',              'contact.component.ts',                'ContactComponent',     'contact'),
    ('src/app/features/blog/blog-list',       'blog-list.component.ts',              'BlogListComponent',    'blog-list'),
    ('src/app/features/blog/blog-detail',     'blog-detail.component.ts',            'BlogDetailComponent',  'blog-detail'),
]

tpl = """\
import {{ Component }} from '@angular/core';
import {{ CommonModule }} from '@angular/common';
import {{ RouterLink }} from '@angular/router';

@Component({{
  selector: 'app-{sel}',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div style="padding-top:68px; padding:80px 32px; text-align:center;">
      <h2 style="font-family:'Outfit',sans-serif; color:#0F2E5A;">{cls}</h2>
      <p style="color:#718096; margin-top:12px;">Página en construcción.</p>
      <a routerLink="/" style="color:#1B4B8A; font-weight:600;">← Volver al inicio</a>
    </div>
  `,
}})
export class {cls} {{}}
"""

for folder, filename, cls, sel in pages:
    os.makedirs(folder, exist_ok=True)
    path = os.path.join(folder, filename)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(tpl.format(cls=cls, sel=sel))
    print(f'OK: {path}')

print('\nTodas las paginas creadas.')
