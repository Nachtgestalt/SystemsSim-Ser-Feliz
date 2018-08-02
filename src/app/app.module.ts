import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {WelcomePage} from "../pages/welcome/welcome";
import {SignUpPage} from "../pages/sign-up/sign-up";
import {ExplorePage} from "../pages/explore/explore";
import { UserProvider } from '../providers/user/user';

// Auth
import {Facebook} from "@ionic-native/facebook";
import { GooglePlus } from '@ionic-native/google-plus';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {MenuPage} from "../pages/menu/menu";
import {MePage} from "../pages/me/me";
import {MessagingPage} from "../pages/messaging/messaging";
import {ChatPage} from "../pages/chat/chat";
import {ComponentsModule} from "../components/components.module";
import {firebaseConfig} from "../config";
import {NgxErrorsModule} from "@ultimate/ngxerrors";
import { AuthProvider } from '../providers/auth/auth';
import {MatchedPage} from "../pages/matched/matched";
import {SwingModule} from "angular2-swing";
import {ElasticModule} from "ng-elastic";

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    ExplorePage,
    SignUpPage,
    MenuPage,
    MePage,
    MessagingPage,
    ChatPage,
    MatchedPage
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    SwingModule,
    ElasticModule,
    IonicModule.forRoot(MyApp, {
      mode: 'ios',// TODO: to have same iOS look for all platforms
      backButtonText: '',
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgxErrorsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    ExplorePage,
    SignUpPage,
    MenuPage,
    MePage,
    MessagingPage,
    ChatPage,
    MatchedPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    Facebook,
    GooglePlus,
    AuthProvider
  ]
})
export class AppModule {}
