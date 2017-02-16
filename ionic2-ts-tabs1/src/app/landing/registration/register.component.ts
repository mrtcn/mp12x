import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController, Platform } from 'ionic-angular';
import { Facebook } from "ng2-cordova-oauth/core";
import { OauthCordova } from 'ng2-cordova-oauth/platform/cordova';
import { AccountService } from '../shared/account.service';
import { RegisterViewModel } from '../shared/account.model';

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

    private _result = new BehaviorSubject<boolean>(false);
    result = this._result.asObservable();

    public registration: RegisterViewModel = new RegisterViewModel(null, null, null, null, null, );

    constructor(public navCtrl: NavController, private platform: Platform, public accountService: AccountService) {
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
        let registrationModel: RegisterViewModel = new RegisterViewModel(this.registration.fullName,
                                                                    this.registration.email,
                                                                    this.registration.userName,
                                                                    this.registration.password,
                                                                    this.registration.confirmPassword);
        let resultObservable = this.accountService.register(registrationModel);
        resultObservable.subscribe(x => {
            this._result.next(x.valueOf());
        })
        
    }
}

