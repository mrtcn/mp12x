import { Component, ViewChild, Input } from '@angular/core';
import { Platform, Nav, MenuController, App } from 'ionic-angular';
import { AccountService }   from '../../auth/shared/account.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ProfilePage } from '../profile/profile'

@Component({
  selector: 'menu-content',
  templateUrl: 'menu.html'
})
export class MenuPage {
    
    @Input() isAuthenticated;

    constructor(private accountService: AccountService, private app: App) {
      
    }

    navigateToProfile() {        
        this.app.getActiveNav().push(ProfilePage);
    }
}