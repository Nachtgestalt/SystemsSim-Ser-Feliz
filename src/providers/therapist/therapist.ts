import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFirestore} from "angularfire2/firestore";

@Injectable()
export class TherapistProvider {

  constructor(private afDB: AngularFirestore) {
    console.log('Hello TherapistProvider Provider');
  }

  verificarUsuario(clave) {

    this.afDB.doc(`/`)

  }

}
