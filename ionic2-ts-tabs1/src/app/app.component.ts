import { Component, ViewChild }             from '@angular/core';
import { Platform, Nav, MenuController }    from 'ionic-angular';
import { StatusBar, Splashscreen }          from 'ionic-native';

import { UserInfo }                         from './auth/shared/account.model';
import { AccountService }                   from './auth/shared/account.service';

import { GamePage }                         from './pages/game/game';
import { AuthComponent }                    from './auth/auth.component';

import { BehaviorSubject }                  from 'rxjs/BehaviorSubject';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage = TabsPage;
    @ViewChild(Nav) nav: Nav;
    rootPage: any = AuthComponent;

    private _isAuthenticated = new BehaviorSubject<boolean>(false);
    isAuthenticated = this._isAuthenticated.asObservable();

    isAuthenticatedOutput: boolean = false;
    xcz: boolean = false;
    constructor(public platform: Platform, public accountService: AccountService, public menu: MenuController) {
        console.log("constructor");
    }

    ngOnInit() {
        console.log("onInit");
        this.platform.ready().then(() => {
            this.accountService.getUserInfo().subscribe(successResult => {
                this._isAuthenticated.next(successResult != null);
                if (successResult != null) {
                    this.nav.setRoot(GamePage, { isAuthenticated: true });
                }
            },
                error => console.log(JSON.stringify(error)),
                () => console.log("Completed"));
            
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
    }

    eventChange(event) {
        console.log("event = " + event);
        this.xcz = event;
    }
}