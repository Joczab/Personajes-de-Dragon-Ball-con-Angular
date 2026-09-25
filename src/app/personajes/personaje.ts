// Forma de un personaje tal como la devuelve https://dragonball-api.com/api/characters
// Solo tipamos lo que vamos a usar.
export type Genero = 'Male' | 'Female' | 'Unknown';

export interface Personaje {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: Genero;
  affiliation: string;
  image: string;
  description?: string;
}

export interface Planeta {
  id: number;
  name: string;
  isDestroyed: boolean;
  description: string;
  image: string;
}

export interface Transformacion {
  id: number;
  name: string;
  image: string;
  ki: string;
}

// El detalle (/characters/:id) trae además el planeta y las transformaciones
export interface PersonajeDetalle extends Personaje {
  originPlanet?: Planeta;
  transformations?: Transformacion[];
}

// Respuesta paginada de la API
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
