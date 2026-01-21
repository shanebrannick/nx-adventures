import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from '@ng-demo-web/entry-point';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
