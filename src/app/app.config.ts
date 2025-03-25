import { ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { provideNgIconLoader, withCaching } from '@ng-icons/core';
import { HttpClient, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import Aura from '@primeng/themes/aura';
import { credentialsInterceptor } from './shared/utils/credentials.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false || 'none'
        }
      }
    }),
    provideHttpClient(withInterceptors([credentialsInterceptor])),
    provideNgIconLoader(name => {
      const http = inject(HttpClient);
      return http.get(`${environment.ICONS_BASE_URL}${name}.svg`, { responseType: 'text' });
    }, withCaching()),
  ]
};
