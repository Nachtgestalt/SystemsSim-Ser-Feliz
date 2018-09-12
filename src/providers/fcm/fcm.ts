import { Injectable } from '@angular/core';
import {AngularFirestore} from "angularfire2/firestore";
import {Platform} from "ionic-angular";
import {Firebase} from "@ionic-native/firebase";
import {Storage} from "@ionic/storage";

@Injectable()
export class FcmProvider {

  idDocument;
  typeUser;
  user;

  constructor(public firebaseNative: Firebase,
              public afs: AngularFirestore,
              private storage: Storage,
              private platform: Platform) {
    this.loadStorage().then(
      () => {
        console.log(this.idDocument);
      }
    );
  }

  async getToken(userId) {
    let token;
    if (this.platform.is('android')) {
      token = await this.firebaseNative.getToken();
    }

    if (this.platform.is('ios')) {
      token = await this.firebaseNative.getToken();
    }

    if(!this.platform.is('cordova')) {
    }

    console.log('Este es el token: ' + JSON.stringify(token));

    return this.saveTokenToFirestore(token, userId)
  }

  private saveTokenToFirestore(token, userId) {
    if(!token) return;
    const devicesRef = this.afs.collection('dispositivos');

    const docData = {
      token: token,
      userId: userId
    };

    return devicesRef.doc(userId).set(docData)
  }

  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen();
  }

  loadStorage() {
    return new Promise( (resolve, reject ) => {
      if (this.platform.is('cordova')) {
        this.storage.get('idDocument').then(val => {
          if (val) {
            this.idDocument = val;
          }
        });
        this.storage.get('user')
          .then(
            val => {
              if (val) {
                this.user = val;
              }
            }
          );
        this.storage.get('typeUser').then(val => {
          if (val) {
            this.typeUser = val;
          }
        });
        return resolve();
      } else {
        this.idDocument = localStorage.getItem('idDocument');
        this.typeUser = localStorage.getItem('typeUser');
        this.user = localStorage.getItem('user');
        return resolve();
      }
    });
  }

}
