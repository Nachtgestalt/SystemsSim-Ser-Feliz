import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ExplorePage} from "../explore/explore";
import {MePage} from "../me/me";
import {MessagingPage} from "../messaging/messaging";
import {AngularFireAuth} from "angularfire2/auth";
import {UserProvider} from "../../providers/user/user";
import {WelcomePage} from "../welcome/welcome";
import {map} from "rxjs/operators";
import {UtilsProvider} from "../../providers/utils/utils";
import {Subscription} from "rxjs/Rx";
import {TrackingPage} from "../tracking/tracking";

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  title: string = '';
  user: any = {};
  subscription: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public _userProv: UserProvider,
              private afAuth: AngularFireAuth) {
    this._userProv.loadStorage().then( existe => {
      if ( existe ) {
        // console.log('Cargo el storage!');
      }
    });

    this.subscription = this._userProv.user$.subscribe(
      data => {
        this.user = data[0];
        this._userProv.setIdDocumentAndType(this.user.id, this.user.tipoUsuario);
        console.log('Observable user', data);
      },
      error1 => console.log(JSON.stringify(error1))
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

  goToTracking() {
    this.navCtrl.push(TrackingPage, {}, {
      direction: 'forward'
    });
  }

  signOutApp() {
    this.afAuth.auth.signOut()
      .then( resp => {
        this._userProv.user = {};
        this.navCtrl.setRoot(WelcomePage);
      })
  }

}
