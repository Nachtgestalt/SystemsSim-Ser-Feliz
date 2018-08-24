import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Rx";
import {map} from "rxjs/operators";
import {UtilsProvider} from "../utils/utils";
import {Platform} from "ionic-angular";

@Injectable()
export class UserProvider {

  user;
  userCollection: AngularFirestoreCollection<any>;
  user$: Observable<any>;

  constructor(private storage: Storage,
              private afs: AngularFirestore,
              public _utilsProv: UtilsProvider,
              private platform: Platform) {
    this.loadStorage();
  }

  setIdDocumentAndType(id, type) {
    if (this.platform.is('cordova')) {
      // Smarthphone
      this.storage.set('idDocument', id);
      this.storage.set('typeUser', type);
    } else {
      // Desktop
      localStorage.setItem('idDocument', id);
      localStorage.setItem('typeUser', type);
    }
  }

  setInStorage(user) {
    if (this.platform.is('cordova')) {
      // Smarthphone
      this.storage.set('user', JSON.stringify(user));
    } else {
      // Desktop
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  loadStorage() {
    return new Promise((resolve, reject) => {
      if (this.platform.is('cordova')) {
        // Smartphone
        this.storage.get('user').then(val => {
          if (val) {
            this.user = JSON.parse(val);
            this.userCollection = this.afs.collection(this.user.tipoUsuario, ref => {
              return ref.where('key', '==', this.user.key)
            });

            //Obtener id del documento
            this.user$ = this.userCollection.snapshotChanges().pipe(
              map(actions => {
                return actions.map(a => {
                  const data = a.payload.doc.data();
                  data.id = a.payload.doc.id;
                  data.age = this._utilsProv.getAgeOnlyYear(data.fecha_nacimiento);
                  console.log(data);
                  return data;
                });
              }),
            );
            resolve(true);
          } else {
            resolve(false);
          }
        });
      } else {
        // Desktop
        if (localStorage.getItem('user')) {
          this.user = JSON.parse(localStorage.getItem('user'));
          this.userCollection = this.afs.collection(this.user.tipoUsuario, ref => {
            return ref.where('key', '==', this.user.key)
          });

          //Obtener id del documento
          this.user$ = this.userCollection.snapshotChanges().pipe(
            map(actions => {
              return actions.map(a => {
                const data = a.payload.doc.data();
                data.id = a.payload.doc.id;
                data.age = this._utilsProv.getAgeOnlyYear(data.fecha_nacimiento);
                console.log(data);
                return data;
              });
            }),
          );
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  }

  initUserFirestore() {
    console.log(this.user);
    this.userCollection = this.afs.collection(this.user.tipoUsuario, ref => {
      return ref.where('key', '==', this.user.key)
    });
  }

  deleteUser() {
    this.user = null;

    if ( this.platform.is('cordova') ) {
      this.storage.remove('user');
    }else {
      localStorage.removeItem('user');
    }
  }

}
