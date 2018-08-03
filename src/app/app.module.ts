import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {WelcomePage} from "../pages/welcome/welcome";
import {ExplorePage} from "../pages/explore/explore";
import { UserProvider } from '../providers/user/user';

// Auth
import {Facebook} from "@ionic-native/facebook";
import { GooglePlus } from '@ionic-native/google-plus';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {AngularFirestoreModule} from "angularfire2/firestore";

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
import { TherapistProvider } from '../providers/therapist/therapist';
import {TypeOfUserPage} from "../pages/type-of-user/type-of-user";
import {SignUpNamePage} from "../pages/sign-up-name/sign-up-name";
import {SignUpBirthdayPage} from "../pages/sign-up-birthday/sign-up-birthday";
import {SignUpGenderPage} from "../pages/sign-up-gender/sign-up-gender";
import {SignUpCredentialsPage} from "../pages/sign-up-credentials/sign-up-credentials";

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    ExplorePage,
    TypeOfUserPage,
    SignUpNamePage,
    SignUpBirthdayPage,
    SignUpGenderPage,
    SignUpCredentialsPage,
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
    AngularFirestoreModule,
    NgxErrorsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    ExplorePage,
    SignUpNamePage,
    SignUpBirthdayPage,
    SignUpGenderPage,
    SignUpCredentialsPage,
    TypeOfUserPage,
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
    AuthProvider,
    TherapistProvider
  ]
})
export class AppModule {}
