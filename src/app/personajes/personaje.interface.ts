export interface Personaje {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: Gender;
  affiliation: string;
  image: string;
  description?: string;
}

export type Gender = 'Male' | 'Female' | 'Unknown';
