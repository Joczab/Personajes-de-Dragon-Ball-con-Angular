import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Planeta } from '../../models/planeta.model';

@Component({
  selector: 'app-planeta-card',          
  templateUrl: './planeta-card.html',     // qué HTML usa
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PlanetaCard {
  readonly planeta = input.required<Planeta>();
}

