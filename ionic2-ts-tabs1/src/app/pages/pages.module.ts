import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AboutPage } from './about/about';
import { ContactPage } from './contact/contact';
import { HomePage } from './home/home';
import { ConnectionService } from '../movie-connection/connection.service';

@NgModule({
    declarations: [AboutPage, ContactPage, HomePage],
    imports: [IonicModule.forRoot(HomePage)],
    bootstrap: [IonicApp],
    entryComponents: [AboutPage, ContactPage, HomePage],
    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, ConnectionService]
})
export class Page{}