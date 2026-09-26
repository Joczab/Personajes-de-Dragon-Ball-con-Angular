import { Component, input, signal } from '@angular/core';
import { Personaje } from '../personaje.interface';
import { LucideImageOff } from '@lucide/angular';

@Component({
  selector: 'app-personaje-card',
  imports: [LucideImageOff],
  templateUrl: './personaje-card.html',
})
export class PersonajeCard {
  personaje = input.required<Personaje>();

  imageLoaded = signal<boolean>(true);


  // onImageLoad() {
  //   this.imageLoaded.set(false);
  // }
}
