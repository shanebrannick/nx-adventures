import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection, isDevMode,
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
// import { webAppRoutes } from './app.routes';
import { webAppRoutes } from '@ng-demo-web/entry-point';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideServiceWorker } from '@angular/service-worker';
import { appViewTransition } from './app.view-transitions';
import { provideAppErrorHandler } from '@ng-demo-web-core/error-handling';

//###########################//

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      webAppRoutes,
      withViewTransitions(appViewTransition)
    ),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideAppErrorHandler(),
  ],
};
