import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    /**
     * Sin esta configuracion Angular conserva la posicion vertical al
     * cambiar de pagina: si el visitante estaba a media pagina en Inicio y
     * tocaba "Proyectos", entraba a Proyectos a media pagina.
     *
     *   scrollPositionRestoration: 'enabled'
     *     Navegacion nueva -> arriba. Boton "atras" del navegador ->
     *     vuelve a donde estaba, que es lo que la gente espera.
     *
     *   anchorScrolling: 'enabled'
     *     Permite enlazar a una seccion concreta con #ancla.
     */
    provideRouter(routes, withInMemoryScrolling({
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    })),
    provideHttpClient(),
  ],
}).catch(err => console.error(err));
