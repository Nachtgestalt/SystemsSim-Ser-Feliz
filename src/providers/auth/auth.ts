import {Injectable} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase/app';
import {GooglePlus} from "@ionic-native/google-plus";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {UserProvider} from "../user/user";
import {Subscription} from "rxjs/Rx";


@Injectable()
export class AuthProvider {
  userCollection: AngularFirestoreCollection<any>;
  private user: firebase.User;
  value$: Subscription;

  constructor(public  afAuth: AngularFireAuth, private googlePlus: GooglePlus,
              private afs: AngularFirestore,
              private _userProv: UserProvider) {
    firebase.auth().useDeviceLanguage();
    afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  verifyAccountExist(source, uid) {
    return new Promise((resolve, reject) => {
        console.log(`uid = ${uid} - source: ${source}`);
        this.userCollection = this.afs.collection(source, ref => {
          return ref.where('key', '==', uid)
        });

        this.value$ = this.userCollection.valueChanges().subscribe(
          data => {
            console.log('Usuario: ' + JSON.stringify(data[0]));
            if (data.length !== 0) {
              this._userProv.setInStorage(data[0]);
              this.value$.unsubscribe();
              resolve(true);
            } else {
              this.value$.unsubscribe();
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
