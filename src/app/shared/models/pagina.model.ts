// Respuesta paginada de la API. Es genérica: sirve para personajes, planetas, etc.
export interface Pagina<T> {
  items: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

// Envuelve un arreglo simple como si fuera una página única
export function unaSolaPagina<T>(items: T[]): Pagina<T> {
  return {
    items,
    meta: {
      totalItems: items.length,
      itemCount: items.length,
      itemsPerPage: items.length,
      totalPages: items.length ? 1 : 0,
      currentPage: 1,
    },
  };
}
