import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Carousel, initTWE } from "tw-elements";
initTWE({ Carousel } );

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
