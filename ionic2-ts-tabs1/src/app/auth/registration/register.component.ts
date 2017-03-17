import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController, Platform, App } from 'ionic-angular';
import { Facebook } from "ng2-cordova-oauth/core";
import { OauthCordova } from 'ng2-cordova-oauth/platform/cordova';
import { AccountService } from '../shared/account.service';
import { RegisterViewModel, RegisterApiModel, LoginViewModel, AccessTokenModel } from '../shared/account.model';
import { GamePage } from '../../pages/game/game';

import {
    SearchApiModel, MovieConnection,
    GameInitialize, UserSelections
} from '../../app/movie-connection/connection.model';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'register',
    templateUrl: 'register.html',
    styleUrls: ['/register.scss'],
    providers: [AccountService]
})

export class RegisterComponent implements OnInit {
    private oauth: OauthCordova = new OauthCordova();
    private facebookProvider: Facebook = new Facebook({
        clientId: "604901223038328",
        appScope: ["email"]
    });

    private _registerResult = new BehaviorSubject<boolean>(false);
    public registerResult = this._registerResult.asObservable();

    private _loginResult = new BehaviorSubject<boolean>(false);
    public loginResult = this._loginResult.asObservable();

    public registration: RegisterViewModel = new RegisterViewModel(null, null, null, null, null );

    constructor(public navCtrl: NavController, private platform: Platform, public accountService: AccountService, private app: App) {
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

    public register() {
        let fullNameArray: string[] = this.registration.fullName.split(" ");
        let firstName: string = fullNameArray.slice(0, -1).join(" ");
        let lastName: string = fullNameArray.slice(fullNameArray.length - 1).join("");
        let registrationApiModel: RegisterApiModel = new RegisterApiModel(firstName,
                                                                            lastName,
                                                                            this.registration.email,
                                                                            this.registration.userName,
                                                                            this.registration.password,
                                                                            this.registration.confirmPassword);
        let resultObservable = this.accountService.register(registrationApiModel);
        resultObservable.subscribe(x => {
            this._registerResult.next(x.valueOf());

            let loginApiModel = new LoginViewModel(this.registration.userName, this.registration.password);
            let accessTokenObservable = this.accountService.login(loginApiModel);
            accessTokenObservable.subscribe(y => {
                this._loginResult.next(y.valueOf());
            });
        });

        this.app.getRootNav().setRoot(GamePage);

    }
}

