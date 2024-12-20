import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter ,withComponentInputBinding, withViewTransitions} from '@angular/router';
import { routes } from './app-routing.module';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withViewTransitions(),    // 👈 allow transition views
      withComponentInputBinding()
    )
  ]
};
