import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";

@Injectable()
export class BadgesProvProvider {

  private badgesCollection: AngularFirestoreCollection<any>;
  constructor(private afs: AngularFirestore) {
    console.log('Hello BadgesProvProvider Provider');
  }

  loadBadges(idDocument) {
    this.badgesCollection = this.afs.collection('logros', ref => {
      return ref.where('id_usuario', '==', idDocument)
    });
    return this.badgesCollection.valueChanges()

  }

}
