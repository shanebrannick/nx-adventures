import { Route } from '@angular/router';

export const webAppRoutes: Route[] = [

  {
    path: '',
    redirectTo: 'welcome', // Change loadComponent to redirectTo
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    loadComponent: () => import('../nx-welcome').then((m) => m.NxWelcome),
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () => import('@ng-demo-web-shared-pages/not-found').then((m) => m.AvivaNotFoundPage),
    pathMatch: 'full',
  },
];
