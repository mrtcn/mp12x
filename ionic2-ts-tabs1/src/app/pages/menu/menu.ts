import { Component, Input }        from '@angular/core';
import { Platform }         from 'ionic-angular';
import { AccountService }   from '../../auth/shared/account.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'menu-content',
  templateUrl: 'menu.html'
})
export class MenuPage {
    
    @Input() isAuthenticated;

    constructor(private accountService: AccountService) {
      
    }
}