import { provideZoneChangeDetection } from "@angular/core";
import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { App } from '@ng-demo-web/entry-point';
import { config } from './app/app.config.server';

const bootstrap = (context: BootstrapContext) => bootstrapApplication(App, 
    {
        ...config,
        providers: [
        provideZoneChangeDetection(), 
         ...config.providers
        ]
    },
    context);

export default bootstrap;
