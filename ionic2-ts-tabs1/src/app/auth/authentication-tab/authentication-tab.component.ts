import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
    tabIndex: Number = 0;

    constructor(private navCtrl: NavController, private params: NavParams) {
        this.tabIndex = this.params.get("tabIndex");
        this.tabLogin = LoginComponent;
        this.tabSignUp = RegisterComponent;
    }
}
