import {Injectable} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase/app';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {UserProvider} from "../user/user";
import {Subscription} from "rxjs/Rx";
import {map, take} from "rxjs/operators";
import {UtilsProvider} from "../utils/utils";


@Injectable()
export class AuthProvider {
  userCollection: AngularFirestoreCollection<any>;
  private user: firebase.User;
  value$: Subscription;

  constructor(public  afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private _userProv: UserProvider,
              public _utilsProv: UtilsProvider) {
    firebase.auth().useDeviceLanguage();
    afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  verifyAccountExist(uid) {
    return new Promise((resolve, reject) => {
        this.userCollection = this.afs.collection('usuarios', ref => {
          return ref.where('key', '==', uid)
        });

        this.userCollection.snapshotChanges()
          .pipe(
            map(actions => {
              return actions.map(a => {
                const data = a.payload.doc.data();
                data.id = a.payload.doc.id;
                data.age = this._utilsProv.getAgeOnlyYear(data.fecha_nacimiento);
                console.log(data);
                return data;
              });
            }),
            take(1)
          ).subscribe(data => {
            console.log('Usuario: ', data);
            if (data.length !== 0) {
              this._userProv.setUserInStorage(data[0]);
              resolve(true);
            } else {
              resolve(false);
            }
          });
      }
    );
  }

  signInWithEmail(credentials) {
    console.log('Sign in with email');
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
      credentials.password);
  }

  signUp(credentials) {
    return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

  get authenticated(): boolean {
    return this.user !== null;
  }

  getEmail() {
    return this.user && this.user.email;
  }

  signOut(): Promise<void> {
    this._userProv.deleteUser();
    return this.afAuth.auth.signOut();
  }

}
