import { Routes } from '@angular/router';

// Rutas de la feature. En app.routes.ts se montan bajo /personajes con loadChildren.
export const PERSONAJES_ROUTES: Routes = [
  {
    path: '',
    title: 'Personajes',
    loadComponent: () => import('./pages/lista-personajes/lista-personajes').then((m) => m.ListaPersonajes),
  },
  {
    path: ':id',
    title: 'Detalle',
    loadComponent: () => import('./pages/detalle-personaje/detalle-personaje').then((m) => m.DetallePersonaje),
  },
];
