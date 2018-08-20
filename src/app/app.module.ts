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
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
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
import {TypeOfUserPage} from "../pages/type-of-user/type-of-user";
import {SignUpNamePage} from "../pages/sign-up-name/sign-up-name";
import {SignUpBirthdayPage} from "../pages/sign-up-birthday/sign-up-birthday";
import {SignUpGenderPage} from "../pages/sign-up-gender/sign-up-gender";
import {SignUpCredentialsPage} from "../pages/sign-up-credentials/sign-up-credentials";
import {OptionsPage} from "../pages/options/options";
import {IonicStorageModule} from "@ionic/storage";
import {SignUpTelephonePage} from "../pages/sign-up-telephone/sign-up-telephone";
import {SignUpContactPersonPage} from "../pages/sign-up-contact-person/sign-up-contact-person";
import {SignUpPersonalInformationPage} from "../pages/sign-up-personal-information/sign-up-personal-information";
import {SignUpProfessionalInfoPage} from "../pages/sign-up-professional-info/sign-up-professional-info";
import { UtilsProvider } from '../providers/utils/utils';
import { UploadFilesProvider } from '../providers/upload-files/upload-files';
import {EditProfilePage} from "../pages/edit-profile/edit-profile";
import {ImagePicker} from "@ionic-native/image-picker";
import {Camera} from "@ionic-native/camera";
import {TrackingPage} from "../pages/tracking/tracking";
import { TrackingProvider } from '../providers/tracking/tracking';
import {ChartsModule} from "ng2-charts";
import {TrackingChartsPage} from "../pages/tracking-charts/tracking-charts";

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    ExplorePage,
    TrackingPage,
    TrackingChartsPage,
    TypeOfUserPage,
    SignUpNamePage,
    SignUpBirthdayPage,
    SignUpGenderPage,
    SignUpTelephonePage,
    SignUpContactPersonPage,
    SignUpPersonalInformationPage,
    SignUpProfessionalInfoPage,
    SignUpCredentialsPage,
    MenuPage,
    MePage,
    EditProfilePage,
    MessagingPage,
    ChatPage,
    MatchedPage,
    OptionsPage
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
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgxErrorsModule,
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    ExplorePage,
    TrackingPage,
    TrackingChartsPage,
    SignUpNamePage,
    SignUpBirthdayPage,
    SignUpGenderPage,
    SignUpTelephonePage,
    SignUpContactPersonPage,
    SignUpPersonalInformationPage,
    SignUpProfessionalInfoPage,
    SignUpCredentialsPage,
    TypeOfUserPage,
    MenuPage,
    MePage,
    EditProfilePage,
    MessagingPage,
    ChatPage,
    MatchedPage,
    OptionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    Facebook,
    Camera,
    AngularFireAuth,
    GooglePlus,
    AuthProvider,
    UtilsProvider,
    UploadFilesProvider,
    TrackingProvider
  ]
})
export class AppModule {}
