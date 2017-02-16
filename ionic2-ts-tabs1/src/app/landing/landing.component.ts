import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { NavController, Platform } from 'ionic-angular';
import { Facebook } from "ng2-cordova-oauth/core";
import { OauthCordova } from 'ng2-cordova-oauth/platform/cordova';
import { AccountService } from './shared/account.service';
import { AuthenticationTabComponent } from './authentication-tab/authentication-tab.component';

import {
    SearchApiModel, MovieConnection,
    GameInitialize, UserSelections
} from '../../app/movie-connection/connection.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'landing-page',
    styleUrls: ['/landing.scss'],
    templateUrl: 'landing.html',
    providers: [AccountService]
})

export class LandingComponent implements OnInit {
    private oauth: OauthCordova = new OauthCordova();
    private facebookProvider: Facebook = new Facebook({
        clientId: "604901223038328",
        appScope: ["email"]
    });

    constructor(public navCtrl: NavController, private platform: Platform) {
    }

    ngOnInit() {                
    }

    public navigate(isRegister: boolean) {
        if (isRegister) {
            this.navCtrl.push(AuthenticationTabComponent);
        } else {
            this.navCtrl.push(AuthenticationTabComponent);
        }
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

}

