import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules,
} from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular, createAnimation } from '@ionic/angular/standalone';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';

const fadeAnimation = (_baseEl: HTMLElement, opts: any) =>
  createAnimation()
    .addAnimation([
      createAnimation().addElement(opts.enteringEl).duration(140).easing('ease-out').fromTo('opacity', '0', '1'),
      createAnimation().addElement(opts.leavingEl).duration(140).easing('ease-out').fromTo('opacity', '1', '0'),
    ]);

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular({ navAnimation: fadeAnimation }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
});
