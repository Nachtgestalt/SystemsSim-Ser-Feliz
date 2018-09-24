import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {Storage} from "@ionic/storage";
import {Platform} from "ionic-angular";
import {map} from "rxjs/operators";
import {Observable} from "rxjs/Rx";
import * as firebase from "firebase";
import {mergeMap} from "rxjs/operators";
import {from} from "rxjs";
import {UserProvider} from "../user/user";

@Injectable()
export class ChatProvider {

  chatCollection: AngularFirestoreCollection<any>;
  messagesCollection: AngularFirestoreCollection<any>;
  relationshipCollection: AngularFirestoreCollection<any>;
  userCollection: AngularFirestoreCollection<any>;
  userDoc: AngularFirestoreDocument<any>;

  idDocument;
  typeUser;
  user;

  constructor(private storage: Storage,
              private afS: AngularFirestore,
              private platform: Platform,
              public _userProv: UserProvider) {
    this.loadStorage().then();
  }

  getFriends(type, idDocument) {
    console.log('Tipo usuario: ' + type);
    this.userCollection = this.afS.collection('usuarios');
    // type === 'terapeutas' ? this.userCollection = this.afS.collection('usuarios')
    //   : this.userCollection = this.afS.collection('terapeutas');
    if (type === 'terapeutas') {
      this.relationshipCollection = this.afS.collection('relaciones', ref => {
        return ref
          .where('id_terapista', '==', idDocument)
          .where('status', '==', 'aceptado')
      });
    } else {
      this.relationshipCollection = this.afS.collection('relaciones', ref => {
        return ref
          .where('id_paciente', '==', idDocument)
          .where('status', '==', 'aceptado')
      })
    }

    return this.relationshipCollection.valueChanges()
      .pipe(
        map( res => {
          return this.getItems(res, type)
        }),
        mergeMap( res => {
          console.log(res);
          return res
        })
      );
  }

  getItems(ids, type): Observable<any> {
    return from(ids).pipe(
      mergeMap((id: any) => {
        console.log(id);
        type === 'terapeutas' ? this.userDoc = this.userCollection.doc(id.id_paciente) :
          this.userDoc = this.userCollection.doc(id.id_terapista);
        return this.userDoc.valueChanges().pipe(
          map(res => {
            type === 'terapeutas' ? res.id = id.id_paciente : res.id = id.id_terapista;
            // res.id = id.id_paciente
            return res
          })
        )
      }
    ));
  }

  loadMessages(idFriend, idDocument) {

    this.typeUser === 'terapeutas' ? this.chatCollection = this.afS.collection('relaciones')
        .doc(`${idFriend}_${idDocument}`)
        .collection('mensajes', ref => ref.orderBy('timestamp', 'asc'))
      : this.chatCollection = this.afS.collection('relaciones')
        .doc(`${idDocument}_${idFriend}`)
        .collection('mensajes', ref => ref.orderBy('timestamp', 'asc'))
    return this.chatCollection.valueChanges();
  }

  saveMessage(message, idFriend, idDocument) {
    // this.loadStorage().then();
    console.log(this.user);
    console.log(this.typeUser);
    console.log(this.idDocument);
    let mensaje = {
      idRemitente: idDocument,
      idDestino: idFriend,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      mensaje: message
    };
    this.typeUser === 'terapeutas' ?
      this.messagesCollection = this.afS.collection('relaciones').doc(`${idFriend}_${idDocument}`).collection('mensajes') :
      this.messagesCollection = this.afS.collection('relaciones').doc(`${idDocument}_${idFriend}`).collection('mensajes');
    return this.messagesCollection.add(mensaje);
  }

  loadStorage() {
    return new Promise(resolve => {
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
        resolve();
      } else {
        this.idDocument = localStorage.getItem('idDocument');
        this.typeUser = localStorage.getItem('typeUser');
        this.user = JSON.parse(localStorage.getItem('user'));
        resolve();
      }
    });
  }

}
