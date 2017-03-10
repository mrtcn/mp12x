import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AboutPage } from './about/about';
import { ContactPage } from './contact/contact';
import { GamePage } from './game/game';
import { ConnectionService } from '../movie-connection/connection.service';

@NgModule({
    declarations: [AboutPage, ContactPage, GamePage],
    imports: [IonicModule.forRoot(GamePage)],
    bootstrap: [IonicApp],
    entryComponents: [AboutPage, ContactPage, GamePage],
    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, ConnectionService]
})
export class Page{}