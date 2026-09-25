import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { LucideZap } from '@lucide/angular';

@Component({
  selector: 'app-root',
  imports: [LucideZap],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly titulo = signal('Directorio de Personajes');
}
