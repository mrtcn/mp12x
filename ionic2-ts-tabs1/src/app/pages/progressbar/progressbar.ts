import { Component, Input } from '@angular/core';

@Component({
  selector: 'progressbar',
  templateUrl: 'progressbar.html'
})
export class ProgressbarPage {
    @Input() isAuthenticated: boolean;
    popcornProgress: string = '25%';
  constructor() {

  }

}
