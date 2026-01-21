import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgDemoAppImages } from '@ng-demo-web-core/config/images';
import { NxWelcome } from './nx-welcome';

@Component({
  imports: [
    NxWelcome,
    RouterModule],
  selector: 'aviva-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected _title = 'angular-demo';

  protected _logoLarge = NgDemoAppImages.Logo.large;
  protected _section_1Large = NgDemoAppImages.Section1.large;
  protected _section_2Large = NgDemoAppImages.Section2.large;
}
