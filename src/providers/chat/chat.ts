import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {Storage} from "@ionic/storage";
import {Platform, ToastController} from "ionic-angular";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs/Rx";
import * as firebase from "firebase";
import {UtilsProvider} from "../utils/utils";

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
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
              private toast: ToastController,
              private _utilsProv: UtilsProvider) {
    this.loadStorage();
  }

  getFriends(type, idDocument) {
    console.log('Entre a getFriends');
    let subscription: Subscription;
    let friends = [];
    console.log('Tipo usuario: ' + type);
    type === 'terapeutas' ? this.userCollection = this.afS.collection('usuarios')
      : this.userCollection = this.afS.collection('terapeutas');
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
    console.log('relationShipCollection')
    return this.relationshipCollection.valueChanges()
      .pipe(
        map((res: Array<any>) => {
          console.log('Entre al map de getFriends');
          res.forEach(
            (friend) => {
              console.log(friend);
              let subscription: Subscription;
              type === 'terapeutas' ? this.userDoc = this.userCollection.doc(friend.id_paciente) :
                this.userDoc = this.userCollection.doc(friend.id_terapista);
              subscription = this.userDoc.valueChanges()
                .subscribe(
                  res => {
                    type === 'terapeutas' ? res.id = friend.id_paciente : res.id = friend.id_terapista;
                    friends.push(res);
                    subscription.unsubscribe();
                  },
                  error1 => console.log('Error enn chatProv: ' + JSON.stringify(error1))
                )
            }
          );
          return friends;
        })
      )
  }

  loadMessages(idFriend) {
    this.loadStorage().then();
    this.typeUser === 'terapeutas' ? this.chatCollection = this.afS.collection('relaciones')
        .doc(`${idFriend}_${this.idDocument}`)
        .collection('mensajes', ref => ref.orderBy('timestamp', 'asc'))
      : this.chatCollection = this.afS.collection('relaciones')
        .doc(`${this.idDocument}_${idFriend}`)
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
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      mensaje: message
    };
    this.typeUser === 'terapeutas' ?
      this.messagesCollection = this.afS.collection('relaciones').doc(`${idFriend}_${idDocument}`).collection('mensajes') :
      this.messagesCollection = this.afS.collection('relaciones').doc(`${idDocument}_${idFriend}`).collection('mensajes');
    return this.messagesCollection.add(mensaje);
  }

  loadStorage() {
    return new Promise( resolve => {
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
