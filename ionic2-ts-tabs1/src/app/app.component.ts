import { Component, ViewChild }               from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { UserInfo }                from './auth/shared/account.model';
import { AccountService }          from './auth/shared/account.service';

import { TabsPage }                from './pages/tabs/tabs';
import { AuthComponent }           from './auth/auth.component';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage = TabsPage;
    @ViewChild(Nav) nav: Nav;
    rootPage: any = AuthComponent;

    constructor(public platform: Platform, public accountService: AccountService) {

    }

    ngOnInit() {
        this.platform.ready().then(() => {

            let userInfo: UserInfo;
            this.accountService.getUserInfo().subscribe(successResult => {
                userInfo = successResult

                if (userInfo == null) {
                    this.rootPage = AuthComponent;
                } else {
                    this.rootPage = TabsPage;
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
}