import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import {ChatPage} from "../chat/chat";
import {MenuPage} from "../menu/menu";
import {ChatProvider} from "../../providers/chat/chat";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {Storage} from "@ionic/storage";
import {map} from 'rxjs/operators'
import {Subscription} from "rxjs/Rx";

@IonicPage()
@Component({
  selector: 'page-messaging',
  templateUrl: 'messaging.html',
})
export class MessagingPage {

  subscribe: Subscription;

  friends = [];
  idDocument;
  typeUser;
  user;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public _chatProv: ChatProvider,
              private storage: Storage,
              private afS: AngularFirestore,
              private platform: Platform) {
  }

  ionViewDidLoad() {
    this.typeUser = this.navParams.get('tipoUsuario');
    this.idDocument = this.navParams.get('idDocument');
    this.subscribe = this._chatProv.getFriends(this.typeUser, this.idDocument)
      .subscribe(
        res => {
          this.friends.push(res);
          console.log(res);
        },
        error1 => {
          console.log('Aqui esta el error: ' + JSON.stringify(error1));
        }
      );
    console.log('ionViewDidLoad MessagingPage');
  }

  ionViewCanLeave() {
    this.subscribe.unsubscribe();
  }

  goToChat(user) {
    this.navCtrl.push(ChatPage, {friend: user});
  }

  goToMenu() {
    this.navCtrl.pop({
      direction: 'back'
    });
  }

  loadStorage() {
    if (this.platform.is('cordova')) {
      this.storage.get('idDocument').then(val => {
        if (val) {
          this.idDocument = val;
        }
      })
        .catch( () => console.log('Error al recuperar idDocument'))
        ;
      this.storage.get('user')
        .then(
          val => {
            if (val) {
              this.user = val;
            }
          }
        )
        .catch( () => console.log('Error al recuperar idDocument'));
      this.storage.get('typeUser').then(val => {
        if (val) {
          this.typeUser = val;
        }
      })
        .catch( () => console.log('Error al recuperar idDocument'));
    } else {
      this.idDocument = localStorage.getItem('idDocument');
      this.typeUser = localStorage.getItem('typeUser');
      this.user = localStorage.getItem('user');
    }
  }

}
