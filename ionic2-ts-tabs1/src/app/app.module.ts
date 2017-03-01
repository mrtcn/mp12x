import { NgModule, ErrorHandler }                   from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, MenuController } from 'ionic-angular';
import { MyApp }                                    from './app.component';
import { AuthModule }                               from './auth/auth.module';
import { Page }                                     from './pages/pages.module';
import { ProgressbarPage }                          from './pages/progressbar/progressbar';
import { MenuPage }                                 from './pages/menu/menu';

@NgModule({
    declarations: [
        MyApp,
        ProgressbarPage,
        MenuPage
    ],
    imports: [
        AuthModule,
        Page,
        IonicModule.forRoot(MyApp)
    ],
  bootstrap: [IonicApp],
  entryComponents: [
      MyApp,
      ProgressbarPage,
      MenuPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule {}
