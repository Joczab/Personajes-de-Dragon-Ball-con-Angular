import { Injectable, computed, effect, signal } from '@angular/core';

// Estado global de la app: lo usan el header y varias features, por eso vive en core.
// Cualquier componente que inyecte este servicio ve los mismos favoritos.
@Injectable({ providedIn: 'root' })
export class FavoritosService {
  private readonly ids = signal<number[]>(leer());

  // Solo lectura hacia afuera: nadie puede hacer .set() desde un componente
  readonly favoritos = this.ids.asReadonly();
  readonly total = computed(() => this.ids().length);

  constructor() {
    effect(() => localStorage.setItem('favoritos', JSON.stringify(this.ids())));
  }

  es(id: number) {
    return this.ids().includes(id);
  }

  alternar(id: number) {
    this.ids.update((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
  }
}

function leer(): number[] {
  try {
    return JSON.parse(localStorage.getItem('favoritos') ?? '[]');
  } catch {
    return [];
  }
}
