import { Routes } from '@angular/router';

// Rutas de primer nivel: cada feature trae sus propias rutas y se carga diferida.
export const routes: Routes = [
  { path: '', redirectTo: 'personajes', pathMatch: 'full' },
  {
    path: 'personajes',
    loadChildren: () => import('./features/personajes/personajes.routes').then((m) => m.PERSONAJES_ROUTES),
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./features/favoritos/favoritos.routes').then((m) => m.FAVORITOS_ROUTES),
  },
  {
    path: 'sugerir',
    loadChildren: () => import('./features/sugerencias/sugerencias.routes').then((m) => m.SUGERENCIAS_ROUTES),
  },
  {
    path: '**',
    title: 'No encontrada',
    loadComponent: () => import('./core/layout/no-encontrada/no-encontrada').then((m) => m.NoEncontrada),
  },
];
