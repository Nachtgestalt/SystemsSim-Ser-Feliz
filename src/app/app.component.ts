import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {WelcomePage} from "../pages/welcome/welcome";
import {MenuPage} from "../pages/menu/menu";
import {AuthProvider} from "../providers/auth/auth";
import {UserProvider} from "../providers/user/user";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any;
  // rootPage:any = MenuPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private auth: AuthProvider,
              public _userProv: UserProvider) {
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

      // this.initializeApp();
    });
  }

  initializeApp(){
    this.auth.afAuth.authState
      .subscribe(
        user => {
          if (user) {
            this.rootPage = MenuPage;
          } else {
            this.rootPage = WelcomePage;
          }
        },
        () => {
          this.rootPage = WelcomePage;
        }
      );
  }

}

