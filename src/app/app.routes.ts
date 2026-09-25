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
    path: 'favoritos',
    title: 'Favoritos',
    loadComponent: () => import('./paginas/favoritos/favoritos').then((m) => m.Favoritos),
  },
  {
    path: 'sugerir',
    title: 'Sugerir personaje',
    loadComponent: () => import('./paginas/sugerir/sugerir').then((m) => m.Sugerir),
  },
  {
    path: '**',
    loadComponent: () => import('./paginas/no-encontrada/no-encontrada').then((m) => m.NoEncontrada),
  },
];
