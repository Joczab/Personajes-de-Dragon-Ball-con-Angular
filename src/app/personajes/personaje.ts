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
