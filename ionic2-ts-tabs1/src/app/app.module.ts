import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LandingComponent } from './landing/landing.component';
import { ConnectionService } from '../app/movie-connection/connection.service';
import { MembershipModule } from './landing/membership.module';
import { AccountService } from './landing/shared/account.service';

@NgModule({
    declarations: [
        MyApp,
        LandingComponent
    //AboutPage,
    //ContactPage,
    //HomePage,
    //TabsPage
  ],
    imports: [        
        //MyApp,
        //AboutPage,
        //ContactPage,
        //HomePage,
        //TabsPage,
        //IonicModule.forRoot(MyApp)
        MembershipModule,
        IonicModule.forRoot(MyApp)
    ],
  bootstrap: [IonicApp],
  entryComponents: [
      MyApp,
      LandingComponent
    //AboutPage,
    //ContactPage,
    //HomePage,
    //TabsPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, ConnectionService, AccountService]
})
export class AppModule {}
