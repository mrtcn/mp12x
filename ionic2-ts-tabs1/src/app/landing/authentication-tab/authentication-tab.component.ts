import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../registration/register.component';

@Component({
    templateUrl: 'authentication-tab.html'
})
export class AuthenticationTabComponent {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    tabLogin: any;
    tabSignUp: any;

    constructor() {
        this.tabLogin = LoginComponent;
        this.tabSignUp = RegisterComponent;
    }
}
