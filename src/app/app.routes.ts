import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
  },
  // Redirect any other path to the main page to handle fragments correctly
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
