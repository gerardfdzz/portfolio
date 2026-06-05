import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { inject } from '@vercel/analytics';

inject();

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
  ]
}).catch(err => console.error(err));
