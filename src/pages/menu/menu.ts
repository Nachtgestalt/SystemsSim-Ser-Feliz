import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ExplorePage} from "../explore/explore";
import {MePage} from "../me/me";
import {MessagingPage} from "../messaging/messaging";
import {AngularFireAuth} from "angularfire2/auth";
import {UserProvider} from "../../providers/user/user";
import {WelcomePage} from "../welcome/welcome";

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  title: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public userProv: UserProvider,
              private afAuth: AngularFireAuth) {

    this.afAuth.authState.subscribe(
      user => {
        console.log('AFAUTH!!');
        console.log(JSON.stringify(user));
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  goToExplore() {
    this.navCtrl.push(ExplorePage);
  }

  goToMe() {
    this.navCtrl.push(MePage, {}, {
      direction: 'back'
    });
  }

  goToMessaging() {
    this.navCtrl.push(MessagingPage, {}, {
      direction: 'forward'
    });
  }

  signOutApp() {
    this.afAuth.auth.signOut()
      .then( resp => {
        this.userProv.user = {};
        this.navCtrl.setRoot(WelcomePage);
      })
  }

}
