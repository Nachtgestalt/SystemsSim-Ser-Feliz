import {Injectable} from '@angular/core';
import {LoadingController, ToastController} from "ionic-angular";

import * as firebase from 'firebase';
import 'rxjs/add/operator/map'
import {Storage} from "@ionic/storage";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";

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

      let uploadTask: firebase.storage.UploadTask = storeRef.child(`profileImg/${fileName}`)
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

  async uploadAudioToFirebase(buffer, fileName, info) {
    let loading = this.loadingCtrl.create({
      content: 'Guardando audio...'
    });
    loading.present();
    let blob = new Blob([buffer], {type: 'audio/mp3'});
    let storeRef = firebase.storage().ref(`meditaciones_audio`);
    let uploadTask: firebase.storage.UploadTask = storeRef.child(`${info.id_terapista}/${fileName}`)
      .put(blob);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {},
      (error) => {
        loading.dismiss();
        console.log(JSON.stringify(error));
        alert('Error al subir archivo')
      },
      () => {
        loading.dismiss();
        alert('Archivo subido con exito');
        uploadTask.snapshot.ref.getDownloadURL().then(url => {
          info['url'] = url;
          this.saveOnFirebase(info);
        });
      });
  }

  setUrlImageUser(url) {
    console.log(`usuarios/${this.idDocument}`);
    this.userDocument = this.afS.doc(`usuarios/${this.idDocument}`);
    this.userDocument.update({photoUrl: url});
  }

  saveOnFirebase(data) {
    let audioCollection: AngularFirestoreCollection = this.afS.collection('meditaciones_audio');
    audioCollection.add(data);
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
