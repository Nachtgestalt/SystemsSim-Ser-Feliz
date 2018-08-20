import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {LoadingController, ToastController} from "ionic-angular";

import * as firebase from 'firebase';
import 'rxjs/add/operator/map'
import {Storage} from "@ionic/storage";
import {AngularFirestore, AngularFirestoreDocument} from "angularfire2/firestore";

@Injectable()
export class UploadFilesProvider {
  userDocument: AngularFirestoreDocument<any>;
  idDocument: string;
  typeUser: string;

  constructor(private afS: AngularFirestore,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              private storage: Storage) {
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


  }

  uploadImageToFirebase(file: FileLoad) {
    let loading = this.loadingCtrl.create({
      content: 'Guardando imagen...'
    });

    let promise = new Promise((resolve, reject) => {

      loading.present();

      let storeRef = firebase.storage().ref();
      let fileName: string = new Date().valueOf().toString();

      let uploadTask: firebase.storage.UploadTask =
        storeRef.child(`profileImg/${fileName}`)
          .putString(file.img, 'base64', {contentType: 'image/jpeg'});
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
        }, //sabe el % de cuantos Mbs se han subido
        (error) => {
          // Manejo de error
          console.log('Error en la carga');
          console.log(JSON.stringify(error));
          this.presentToast(JSON.stringify(error));
          reject();
        },
        () => {
          //Todo bien!!
          console.log('Archivo subido');
          loading.dismiss();
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.setUrlImageUser(downloadURL);
            resolve();
          });
        }
      )
    });

    return promise;
  }

  setUrlImageUser(url) {
    console.log(`${this.typeUser}/${this.idDocument}`);
    this.userDocument = this.afS.doc(`${this.typeUser}/${this.idDocument}`);
    this.userDocument.update({photoUrl: url});
  }

  presentToast(message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}


interface FileLoad {
  titulo?: string;
  img: string;
  key?: string;
}
