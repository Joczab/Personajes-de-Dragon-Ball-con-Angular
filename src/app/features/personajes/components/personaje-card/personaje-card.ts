import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideImageOff, LucideStar, LucideZap } from '@lucide/angular';
import { Personaje } from '../../models/personaje.model';

@Component({
  selector: 'app-personaje-card',
  // Clases en el elemento <app-personaje-card> mismo (el "host").
  // break-inside-avoid: la tarjeta no se parte entre dos columnas del masonry.
  // mb-4: separación vertical, porque en columns el gap solo separa columnas.
  host: { class: 'mb-4 block break-inside-avoid' },
  imports: [RouterLink, LucideZap, LucideImageOff, LucideStar],
  templateUrl: './personaje-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// Componente de presentación: muestra un personaje y avisa cuando lo marcan.
// No inyecta servicios; todo le llega por input() y sale por output().
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
