import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController, Platform, App } from 'ionic-angular';
import { Facebook } from "ng2-cordova-oauth/core";
import { OauthCordova } from 'ng2-cordova-oauth/platform/cordova';
import { AccountService } from '../shared/account.service';
import { LoginViewModel } from '../shared/account.model';
import { GamePage } from '../../pages/game/game';

import {
    SearchApiModel, MovieConnection,
    GameInitialize, UserSelections
} from '../../app/movie-connection/connection.model';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'login',
    templateUrl: 'login.html',
    styleUrls: ['/login.scss'],
    providers: [AccountService]
})

export class LoginComponent implements OnInit {

    public login: LoginViewModel = new LoginViewModel(null, null);
    private oauth: OauthCordova = new OauthCordova();
    private facebookProvider: Facebook = new Facebook({
        clientId: "604901223038328",
        appScope: ["email"]
    });
    private _result = new BehaviorSubject<boolean>(false);
    result = this._result.asObservable();

    constructor(public navCtrl: NavController, private platform: Platform, private accountService: AccountService, private app: App) {
    }

    ngOnInit() {
    }
    
    public facebook() {
        this.platform.ready().then(() => {
            this.oauth.logInVia(this.facebookProvider,
                {
                    target: "_blank"
                }).then(success => {
                    console.log("RESULT: " + JSON.stringify(success));
                }, error => {
                    console.log("ERROR: ", error);
                });
        });
    }

    public loginSubmit() {
        let loginModel = new LoginViewModel(this.login.userName, this.login.password);
        this.accountService.login(loginModel).subscribe(x => {
            let result: boolean = x.valueOf() != null;
            this._result.next(result);
        });
        
        this.app.getRootNav().setRoot(GamePage);
    }
}

