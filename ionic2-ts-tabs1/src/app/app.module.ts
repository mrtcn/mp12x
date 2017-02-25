import { NgModule, ErrorHandler }                   from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp }                                    from './app.component';
import { AuthModule }                               from './auth/auth.module';
import { Page }                                     from './pages/pages.module';

@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        AuthModule,
        Page,
        IonicModule.forRoot(MyApp)
    ],
  bootstrap: [IonicApp],
  entryComponents: [
      MyApp
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule {}
