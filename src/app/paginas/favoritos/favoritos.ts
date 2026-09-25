import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { PersonajeCard } from '../../personajes/personaje-card/personaje-card';
import { PersonajesService } from '../../personajes/personajes.service';
import { FavoritosService } from '../../personajes/favoritos.service';

@Component({
  selector: 'app-favoritos',
  imports: [PersonajeCard, RouterLink],
  templateUrl: './favoritos.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Favoritos {
  private readonly servicio = inject(PersonajesService);
  protected readonly favs = inject(FavoritosService);

  protected readonly personajes = toSignal(
    toObservable(this.favs.favoritos).pipe(switchMap((ids) => this.servicio.varios(ids))),
    { initialValue: [] },
  );
}
