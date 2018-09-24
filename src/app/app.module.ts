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
import { AngularFireDatabaseModule } from 'angularfire2/database';
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
import { TherapistsProvider } from '../providers/therapists/therapists';
import {ProfilePage} from "../pages/profile/profile";
import {ListOfRequestPage} from "../pages/list-of-request/list-of-request";
import { ChatProvider } from '../providers/chat/chat';
import {DirectivesModule} from "../directives/directives.module";
import {Keyboard} from "@ionic-native/keyboard";
import {PipesModule} from "../pipes/pipes.module";
import { FcmProvider } from '../providers/fcm/fcm';
import {RelaxPage} from "../pages/relax/relax";
import {VideosPage} from "../pages/videos/videos";
import {Firebase} from "@ionic-native/firebase";
import {AudiosPage} from "../pages/audios/audios";
import {ObjectivesPage} from "../pages/objectives/objectives";
import {VideosTherapistPage} from "../pages/videos-therapist/videos-therapist";
import {AudiosTherapistPage} from "../pages/audios-therapist/audios-therapist";
import {RecordVideoPage} from "../pages/record-video/record-video";
import { RelaxProvProvider } from '../providers/relax-prov/relax-prov';
import {File} from "@ionic-native/file";
import {FileChooser} from "@ionic-native/file-chooser";
import {FilePath} from "@ionic-native/file-path";
import {RecordAudioPage} from "../pages/record-audio/record-audio";
import {RecordObjectivePage} from "../pages/record-objective/record-objective";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {BadgesPage} from "../pages/badges/badges";
import { BadgesProvProvider } from '../providers/badges-prov/badges-prov';

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    ExplorePage,
    ListOfRequestPage,
    ProfilePage,
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
    BadgesPage,
    RelaxPage,
    VideosPage,
    VideosTherapistPage,
    RecordVideoPage,
    AudiosPage,
    RecordAudioPage,
    AudiosTherapistPage,
    ObjectivesPage,
    RecordObjectivePage,
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
    DirectivesModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    NgxErrorsModule,
    ChartsModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    ExplorePage,
    ListOfRequestPage,
    ProfilePage,
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
    BadgesPage,
    RelaxPage,
    VideosPage,
    VideosTherapistPage,
    RecordVideoPage,
    AudiosPage,
    RecordAudioPage,
    AudiosTherapistPage,
    ObjectivesPage,
    RecordObjectivePage,
    MePage,
    EditProfilePage,
    MessagingPage,
    ChatPage,
    MatchedPage,
    OptionsPage
  ],
  providers: [
    StatusBar,
    File,
    FilePath,
    FileChooser,
    SplashScreen,
    ImagePicker,
    Keyboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    Facebook,
    Camera,
    AngularFireAuth,
    GooglePlus,
    AuthProvider,
    UtilsProvider,
    UploadFilesProvider,
    TrackingProvider,
    TherapistsProvider,
    ChatProvider,
    Firebase,
    FcmProvider,
    RelaxProvProvider,
    LocalNotifications,
    BadgesProvProvider
  ]
})
export class AppModule {}
