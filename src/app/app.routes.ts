import { Routes } from '@angular/router';
import { CoverComponent } from './sections/cover/cover.component';
import { AboutMeComponent } from './sections/about-me/about-me.component';
import { JobsComponent } from './sections/jobs/jobs.component';
import { TechComponent } from './sections/tech/tech.component';
import { FooterComponent } from './sections/footer/footer.component';

export const routes: Routes = [
  {
    path: '',
    component: CoverComponent,
  },
  {
    path: '',
    component: AboutMeComponent,
  },
  {
    path: '',
    component: JobsComponent,
  },
  {
    path: '',
    component: TechComponent,
  },
  {
    path: '',
    component: FooterComponent,
  },
];
