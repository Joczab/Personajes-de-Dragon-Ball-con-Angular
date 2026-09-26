import { Personaje } from "./personaje.interface";

// Datos de ejemplo para el sábado 1. El sábado 2 los cambiamos por la API real.
const img = (archivo: string) => `https://dragonball-api.com/characters/${archivo}`;


export const PERSONAJES_MOCK: Personaje[] = [
{ id: 1, name: 'Goku', ki: '60.000.000', maxKi: '90 Septillion', race: 'Saiyan', gender: 'Male', affiliation: 'Z Fighter', image: img('goku_normal.webp') },
{ id: 2, name: 'Vegeta', ki: '54.000.000', maxKi: '19.84 Septillion', race: 'Saiyan', gender: 'Male', affiliation: 'Z Fighter', image: img('vegeta_normal.webp') },
{ id: 3, name: 'Piccolo', ki: '2.000.000', maxKi: '500.000.000', race: 'Namekian', gender: 'Male', affiliation: 'Z Fighter', image: img('picolo_normal.webp') },
{ id: 4, name: 'Bulma', ki: '0', maxKi: '0', race: 'Human', gender: 'Female', affiliation: 'Z Fighter', image: img('bulma.webp') },
{ id: 5, name: 'Freezer', ki: '530.000', maxKi: '52.71 Septillion', race: 'Frieza Race', gender: 'Male', affiliation: 'Army of Frieza', image: img('Freezer.webp') },
{ id: 10, name: 'Gohan', ki: '45.000.000', maxKi: '40 septillion', race: 'Saiyan', gender: 'Male', affiliation: 'Z Fighter', image: img('gohan.webp') },
{ id: 11, name: 'Krilin', ki: '1.000.000', maxKi: '1 Billion', race: 'Human', gender: 'Male', affiliation: 'Z Fighter', image: img('Krilin_Universo7.webp') },
{ id: 18, name: 'Androide 18', ki: '280.000.000', maxKi: '300.000.000', race: 'Android', gender: 'Female', affiliation: 'Z Fighter', image: img('Androide_18.webp') },
];
