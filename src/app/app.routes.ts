import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Services } from './services/services';
import { NotFound } from './not-found/not-found';
import { Gallery } from './gallery/gallery';
import { Contact } from './contact/contact';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'services',
    component: Services,
  },
  {
    path: 'gallery',
    component: Gallery,
  },
  {
    path: 'contact',
    component: Contact,
  },
  {
    path: '**',
    component: NotFound,
  },
];
