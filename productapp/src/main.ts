import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

//bootstrap demarre le module AppModule 
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
