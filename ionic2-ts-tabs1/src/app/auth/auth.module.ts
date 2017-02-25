import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AuthenticationTabComponent } from './authentication-tab/authentication-tab.component.ts'
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './registration/register.component';

import { AccountService } from './shared/account.service';

@NgModule({
    declarations: [
        AuthComponent,
        AuthenticationTabComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        IonicModule.forRoot(AuthenticationTabComponent, { tabsPlacement: 'top' })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        AuthComponent,
        AuthenticationTabComponent,
        LoginComponent,
        RegisterComponent
    ],
    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, AccountService]
})
export class AuthModule { }
