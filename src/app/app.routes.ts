import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'personajes', pathMatch: 'full' },
  {
    path: 'personajes',
    title: 'Personajes',
    loadComponent: () => import('./paginas/lista/lista').then((m) => m.Lista),
  },
  {
    path: 'personajes/:id',
    title: 'Detalle',
    loadComponent: () => import('./paginas/detalle/detalle').then((m) => m.Detalle),
  },
  {
    path: '**',
    loadComponent: () => import('./paginas/no-encontrada/no-encontrada').then((m) => m.NoEncontrada),
  },
];
