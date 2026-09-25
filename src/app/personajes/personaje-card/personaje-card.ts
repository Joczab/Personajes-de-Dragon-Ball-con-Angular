import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { LucideImageOff, LucideZap } from '@lucide/angular';
import { Personaje } from '../personaje';

@Component({
  selector: 'app-personaje-card',
  imports: [LucideZap, LucideImageOff],
  templateUrl: './personaje-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonajeCard {
  // input.required: el padre está obligado a pasarlo. Se lee como signal: personaje()
  readonly personaje = input.required<Personaje>();

  // Si la imagen no carga, mostramos un ícono en su lugar
  protected readonly imagenFallo = signal(false);
}
