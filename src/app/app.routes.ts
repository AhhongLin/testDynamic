import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'aa',
    loadComponent: () => import('./aa/aa.component').then((c) => c.AaComponent)
  }
];
