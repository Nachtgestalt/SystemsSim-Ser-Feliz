import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {Storage} from "@ionic/storage";
import {Platform, ToastController} from "ionic-angular";
import {UserProvider} from "../user/user";

@Injectable()
export class RelaxProvProvider {
  idDocument;
  videosCollection: AngularFirestoreCollection<any>;
  videosDocument: AngularFirestoreDocument<any>;

  constructor(private afS: AngularFirestore,
              private storage: Storage,
              private platform: Platform,
              public _userProv: UserProvider) {
    console.log('Hello RelaxProvProvider Provider');
    this._userProv.getIdDocument().then(
      data => {
        this.idDocument = data;
        console.log('Id Document: ', this.idDocument);
      }
    )
  }

  recordVideo(videoData) {
    this.videosCollection = this.afS.collection(`meditaciones_video`);
    return this.videosCollection.doc(`${videoData.id}`).set(
      {
        id_terapista: this.idDocument,
        id_video: videoData.id,
        descripcion: videoData.descripcion,
        titulo: videoData.titulo,
        tipo: 'video'
      }
    );
  }

  loadData(idDocument, collection) {
    this.videosCollection = this.afS.collection(collection, ref => {
      return ref
        .where('id_terapista', '==', idDocument)
    });
    return this.videosCollection.valueChanges()
  }

  loadDataPatient(idDocument, type) {
    this.videosCollection = this.afS.collection('recomendaciones', ref => {
      return ref
        .where('id_paciente', '==', idDocument)
        .where('tipo', '==', type)
    });

    return this.videosCollection.valueChanges()

  }

  removeVideo(id) {
    this.videosDocument = this.afS.doc(`meditaciones_video/${id}`);
    return this.videosDocument.delete();
  }

  shareVideo(patients: Array<any>, video) {
    patients.forEach(
      (x) => {
        video.id_paciente = x;
        this.videosCollection = this.afS.collection(`recomendaciones`)
        this.videosCollection.add(video)
      }
    )
  }
}
