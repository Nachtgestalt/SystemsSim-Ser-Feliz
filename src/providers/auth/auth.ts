import {Injectable} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase/app';
import AuthService = firebase.auth.AuthProvider;
import {GooglePlus} from "@ionic-native/google-plus";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Rx";
import {forkJoin} from "rxjs";


@Injectable()
export class AuthProvider {
  userCollection: AngularFirestoreCollection<any>;
  therapistCollection: AngularFirestoreCollection<any>;
  private user: firebase.User;

  constructor(public  afAuth: AngularFireAuth, private googlePlus: GooglePlus,
              private afs: AngularFirestore) {
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

        let value$ = this.userCollection.valueChanges();
        value$.subscribe(
            data => {
              console.log('Usuario: ' + JSON.stringify(data));
              if (data.length !== 0) {
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

  sigInWithGoogle() {
    console.log('Autenticado con google');
    console.log(this.oauthSignIn(new firebase.auth.GoogleAuthProvider()));
    return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
  }

  private oauthSignIn(provider: AuthService) {
    if (!(<any>window).cordova) {
      return this.afAuth.auth.signInWithPopup(provider);
    } else {
      return this.afAuth.auth.signInWithRedirect(provider)
        .then(() => {
          return this.afAuth.auth.getRedirectResult().then(result => {
            console.log(JSON.stringify(result));
            // This gives you a Google Access Token.
            // You can use it to access the Google API.
            // let token = result.credential.accessToken;
            // The signed-in user info.
            let user = result.user;
            // console.log(token, user);
          }).catch(function (error) {
            // Handle Errors here.
            alert(error.message);
          });
        });
    }
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
    this.googlePlus.disconnect();
    return this.afAuth.auth.signOut();
  }

}
