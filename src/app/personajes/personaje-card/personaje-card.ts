import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { LucideImageOff, LucideStar, LucideZap } from '@lucide/angular';
import { Personaje } from '../personaje';

@Component({
  selector: 'app-personaje-card',
  imports: [LucideZap, LucideImageOff, LucideStar],
  templateUrl: './personaje-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonajeCard {
  // Entradas: datos que bajan del padre
  readonly personaje = input.required<Personaje>();
  readonly esFavorito = input(false);

  // Salida: evento que sube al padre. La card no decide qué pasa, solo avisa.
  readonly favoritoCambiado = output<number>();

  protected readonly imagenFallo = signal(false);

  protected marcar() {
    this.favoritoCambiado.emit(this.personaje().id);
  }
}
