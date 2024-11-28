import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts'; // for dashboards
platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
  providers: [provideCharts(withDefaultRegisterables())],// for dashboards
  
})
  .catch(err => console.error(err));
