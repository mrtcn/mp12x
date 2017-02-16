import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AuthenticationTabComponent } from './authentication-tab/authentication-tab.component.ts'
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './registration/register.component';

@NgModule({
    declarations: [
        AuthenticationTabComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        IonicModule.forRoot(AuthenticationTabComponent, { tabsPlacement: 'top' })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        AuthenticationTabComponent,
        LoginComponent,
        RegisterComponent
    ],
    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class MembershipModule { }
