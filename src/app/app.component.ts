import {Component} from '@angular/core';
import {Platform, ToastController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {WelcomePage} from "../pages/welcome/welcome";
import {MenuPage} from "../pages/menu/menu";
import {UserProvider} from "../providers/user/user";
import {FcmProvider} from "../providers/fcm/fcm";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {RelaxProvProvider} from "../providers/relax-prov/relax-prov";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              public localNotifications: LocalNotifications,
              public _userProv: UserProvider,
              public fcm: FcmProvider, public toastCtrl: ToastController,
              public _relaxProv: RelaxProvProvider) {
    platform.ready().then(() => {
      this.localNotifications.on('yes').subscribe(
        res => {
          // console.log('Notificacion local', res);
          this._relaxProv.testUpdateObjective(res.data.idDocument)
        }
      );
      this._userProv.isUserInStorage().then(exist => {
        if (platform.is('cordova')) {
          this.fcm.listenToNotifications().subscribe();
        }
        statusBar.styleBlackOpaque();
        splashScreen.hide();
        if (exist) {
          this.rootPage = MenuPage;
        } else {
          this.rootPage = WelcomePage;
        }
      });
    });
  }
}

