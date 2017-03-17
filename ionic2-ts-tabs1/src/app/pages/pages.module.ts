import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AboutPage } from './about/about';
import { ProfilePage } from './profile/profile';
import { ContactPage } from './contact/contact';
import { GamePage } from './game/game';
import { ConnectionService } from '../movie-connection/connection.service';
import { AccountService } from '../auth/shared/account.service';

@NgModule({
    declarations: [AboutPage, ContactPage, GamePage, ProfilePage],
    imports: [IonicModule.forRoot(GamePage)],
    bootstrap: [IonicApp],
    entryComponents: [AboutPage, ContactPage, GamePage, ProfilePage],
    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, AccountService, ConnectionService]
})
export class Page{}