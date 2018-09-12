import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import {ExplorePage} from "../explore/explore";
import {MePage} from "../me/me";
import {MessagingPage} from "../messaging/messaging";
import {AngularFireAuth} from "angularfire2/auth";
import {UserProvider} from "../../providers/user/user";
import {WelcomePage} from "../welcome/welcome";
import {Subscription} from "rxjs/Rx";
import {TrackingPage} from "../tracking/tracking";
import {ListOfRequestPage} from "../list-of-request/list-of-request";
import {Storage} from "@ionic/storage";
import {FcmProvider} from "../../providers/fcm/fcm";
import {RelaxPage} from "../relax/relax";

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  title: string = '';
  user: any = {};
  subscription: Subscription;

  idDocument;
  typeUser;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public fcm: FcmProvider,
              public toastCtrl: ToastController,
              public _userProv: UserProvider,
              private afAuth: AngularFireAuth,
              private storage: Storage,
              private platform: Platform) {
    this._userProv.loadStorage().then(existe => {
      if (existe) {
        this.subscription = this._userProv.user$.subscribe(
          data => {
            this.user = data[0];
            this.fcm.getToken(this.user.id);
            this._userProv.setIdDocumentAndType(this.user.id, this.user.tipoUsuario);
            console.log('Observable user', data);
          },
          error1 => console.log(JSON.stringify(error1))
        );
      }
    });
    if (this.platform.is('cordova')) {
      this.fcm.listenToNotifications().subscribe();
    }
  }

  ionViewCanEnter() {
    this.loadStorage().then();
    console.log(this.typeUser);
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
    this.navCtrl.push(MessagingPage, {
      tipoUsuario: this.typeUser,
      usuario: this.user,
      idDocument: this.idDocument
    }, {
      direction: 'forward'
    });
  }

  goToTracking() {
    this.navCtrl.push(TrackingPage, {}, {
      direction: 'forward'
    });
  }

  goToListOfRequest() {
    this.navCtrl.push(ListOfRequestPage, {
      tipoUsuario: this.typeUser,
      usuario: this.user,
      idDocument: this.idDocument
    }, {
      direction: 'forward'
    });
  }

  goToRelax() {
    this.navCtrl.push(RelaxPage, {
      tipoUsuario: this.typeUser,
      usuario: this.user,
      idDocument: this.idDocument
    }, {
      direction: 'forward'
    });
  }

  signOutApp() {
    this.afAuth.auth.signOut()
      .then(resp => {
        this._userProv.user = {};
        this.navCtrl.setRoot(WelcomePage);
      })
  }

  loadStorage() {
    return new Promise((resolve, reject) => {
      if (this.platform.is('cordova')) {
        this.storage.get('idDocument').then(val => {
          if (val) {
            this.idDocument = val;
          }
        });
        this.storage.get('typeUser').then(val => {
          if (val) {
            this.typeUser = val;
          }
        });
        resolve();
      } else {
        this.idDocument = localStorage.getItem('idDocument');
        this.typeUser = localStorage.getItem('typeUser');
        resolve();
      }
    });
  }

}
