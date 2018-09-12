import { Component } from '@angular/core';
import {Platform, ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {WelcomePage} from "../pages/welcome/welcome";
import {MenuPage} from "../pages/menu/menu";
import {AuthProvider} from "../providers/auth/auth";
import {UserProvider} from "../providers/user/user";
import {FcmProvider} from "../providers/fcm/fcm";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any;
  // rootPage:any = MenuPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private auth: AuthProvider,
              public _userProv: UserProvider,
              public fcm: FcmProvider, public toastCtrl: ToastController) {
    platform.ready().then(() => {
      this._userProv.loadStorage().then( exist => {
        statusBar.styleDefault();
        splashScreen.hide();
        if( exist ) {
          this.rootPage = MenuPage;
        } else {
          this.rootPage = WelcomePage;
        }
      });
    });
  }
}

