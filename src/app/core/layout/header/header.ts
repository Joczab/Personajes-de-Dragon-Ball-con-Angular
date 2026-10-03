import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideStar, LucideZap } from '@lucide/angular';
import { FavoritosService } from '@core/services/favoritos.service';

// Barra superior: se muestra en todas las páginas, por eso vive en core/layout.
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, LucideZap, LucideStar],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected readonly titulo = signal('Directorio de Personajes');
  protected readonly favs = inject(FavoritosService);
}
