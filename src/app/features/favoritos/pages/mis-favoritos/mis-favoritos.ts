import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { FavoritosService } from '@core/services/favoritos.service';
import { PersonajeCard } from '@features/personajes/components/personaje-card/personaje-card';
import { PersonajesService } from '@features/personajes/services/personajes.service';

@Component({
  selector: 'app-mis-favoritos',
  imports: [PersonajeCard, RouterLink],
  templateUrl: './mis-favoritos.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// Una página puede usar componentes y servicios de otra feature,
// pero nunca sus páginas (esas solo las carga el router).
export class MisFavoritos {
  private readonly servicio = inject(PersonajesService);
  protected readonly favs = inject(FavoritosService);

  protected readonly personajes = toSignal(
    toObservable(this.favs.favoritos).pipe(switchMap((ids) => this.servicio.varios(ids))),
    { initialValue: [] },
  );
}
