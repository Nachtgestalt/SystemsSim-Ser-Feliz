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
import {BadgesPage} from "../badges/badges";

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
              public _userProv: UserProvider,
              public fcm: FcmProvider,
              public toastCtrl: ToastController,
              private afAuth: AngularFireAuth) {

    this._userProv.getUser().then(user => {
      this._userProv.getUser$(user)
        .subscribe(data => {
            this.user = data[0];
            this.fcm.getToken(this.user.id);
            this._userProv.setIdDocumentAndType(this.user.id, this.user.tipoUsuario);
            console.log('Observable user', user);
          },
          error1 => console.error(error1));
    });
    // this._userProv.loadStorage().then(existe => {
    //   if (existe) {
    //     this.subscription = this._userProv.user$.subscribe(
    //       data => {
    //         this.user = data[0];
    //         this.fcm.getToken(this.user.id);
    //         this._userProv.setIdDocumentAndType(this.user.id, this.user.tipoUsuario);
    //         console.log('Observable user', data);
    //       },
    //       error1 => console.log(JSON.stringify(error1))
    //     );
    //   }
    // });
  }

  ionViewCanEnter() {
    // this.loadStorage().then();
    console.log(this.typeUser);
  }

  ionViewWillLeave() {
    // this.subscription.unsubscribe();
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
      tipoUsuario: this.user.tipoUsuario,
      usuario: this.user,
      idDocument: this.user.id
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
      tipoUsuario: this.user.tipoUsuario,
      usuario: this.user,
      idDocument: this.user.id
    }, {
      direction: 'forward'
    });
  }

  goToBadges() {
    this.navCtrl.push(BadgesPage, {
      tipoUsuario: this.user.tipoUsuario,
      usuario: this.user,
      idDocument: this.user.id
    }, {
      direction: 'forward'
    });
  }

  goToRelax() {
    this.navCtrl.push(RelaxPage, {
      tipoUsuario: this.user.tipoUsuario,
      usuario: this.user,
      idDocument: this.user.id
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

  // loadStorage() {
  //   return new Promise((resolve, reject) => {
  //     if (this.platform.is('cordova')) {
  //       this.storage.get('idDocument').then(val => {
  //         if (val) {
  //           this.idDocument = val;
  //         }
  //       });
  //       this.storage.get('typeUser').then(val => {
  //         if (val) {
  //           this.typeUser = val;
  //         }
  //       });
  //       resolve();
  //     } else {
  //       this.idDocument = localStorage.getItem('idDocument');
  //       this.typeUser = localStorage.getItem('typeUser');
  //       resolve();
  //     }
  //   });
  // }

}
