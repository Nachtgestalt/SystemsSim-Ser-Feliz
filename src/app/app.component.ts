import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {WelcomePage} from "../pages/welcome/welcome";
import {MenuPage} from "../pages/menu/menu";
import {AuthProvider} from "../providers/auth/auth";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any;
  // rootPage:any = MenuPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private auth: AuthProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      this.initializeApp();
      splashScreen.hide();
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

