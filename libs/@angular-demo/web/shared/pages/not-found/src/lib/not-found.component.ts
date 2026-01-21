import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  providers: [],
  selector: 'aviva-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvivaNotFoundPage {
  protected _title = 'AvivaNotFoundComponent_Title';
} //Cls
