import {Component, ViewChild} from '@angular/core';
import {AlertController, App, IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";

import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import {Platform} from 'ionic-angular';
import {Facebook} from '@ionic-native/facebook';
import {GooglePlus} from '@ionic-native/google-plus';
import {MenuPage} from "../menu/menu";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TypeOfUserPage} from "../type-of-user/type-of-user";
import {AuthProvider} from "../../providers/auth/auth";

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  loginForm: FormGroup;
  loginError: string;
  @ViewChild('slides') slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App,
              private afAuth: AngularFireAuth,
              public userProv: UserProvider,
              private fb: Facebook,
              private platform: Platform,
              private googlePlus: GooglePlus,
              public auth: AuthProvider,
              public alertCtrl: AlertController) {

    this.loginForm = new FormGroup({
      'email': new FormControl('', Validators.compose([Validators.required, Validators.email])),
      'password': new FormControl('',
        Validators.compose([Validators.required]))
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  goToSignUp() {
    this.navCtrl.push(TypeOfUserPage, {
      provider: 'email'
    }, {
      direction: 'forward'
    });
  }

  login() {
    let data = this.loginForm.value;
    if (!data.email) {
      return;
    }
    let credentials = {
      email: data.email,
      password: data.password
    };
    this.auth.signInWithEmail(credentials)
      .then(user => {
        console.log('User email: ', user);
        this.auth.verifyAccountExist(user.user.uid)
          .then(existe => this.navCtrl.setRoot(MenuPage));
      })
      .catch(err => {
        console.log(err);
        this.alertCtrl.create({
          title: 'Error al autenticar',
          subTitle: 'Usuario y/o contraseña incorrectos',
          buttons: ['Aceptar']
        }).present();
      })
    // if (existe) {
    //   this.navCtrl.setRoot(MenuPage)
    // } else {
    //   this.auth.verifyAccountExist(user.user.uid).then(
    //     existe => {
    //       if (existe) {
    //         this.navCtrl.setRoot(MenuPage)
    //       }
    //     });
    // }
  }

  googleLogin() {
    if (this.platform.is('cordova')) {
      this.nativeGoogleLogin()
        .then((user: any) => {
          console.log(user);
          this.auth.verifyAccountExist(user.user.uid)
            .then(existe => {
              existe ? this.navCtrl.setRoot(MenuPage) : this.navCtrl.push(TypeOfUserPage, {
                key: user.user.uid,
                provider: 'google'
              });
            })
            .catch(error => {
              this.alertCtrl.create({
                title: 'No existe usuario',
                subTitle: 'Cree una cuenta nueva para poder ingresar',
                buttons: ['Aceptar']
              }).present();
              console.log("Firebase failure: ", error);
            });
        })
        .catch(() => this.googlePlus.disconnect().then(() => console.log('Saliendo de google')));
    } else {
      this.webGoogleLogin();
    }
  }

  async nativeGoogleLogin(): Promise<any> {
    try {
      const gplusUser = await this.googlePlus.login({
        'webClientId': '1031764141009-lh0b5cj7fiqcquih0cjisbeuhqt6dkdq.apps.googleusercontent.com',
        'offline': true
      });

      return await this.afAuth.auth.signInAndRetrieveDataWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      )
    } catch (err) {
      this.googlePlus.logout().then(() => console.log('Saliendo de google'));
      console.log(err);
    }
  }

  async webGoogleLogin(): Promise<any> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider)
    } catch (err) {
      console.log(err)
    }
  }

  signInGoogle() {
    this.googlePlus.login({
      'webClientId': '1031764141009-lh0b5cj7fiqcquih0cjisbeuhqt6dkdq.apps.googleusercontent.com',
      'offline': true
    }).then(res => {
      console.log('Aqui si entro en el login google');
      firebase.auth().signInAndRetrieveDataWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        .then((user: any) => {
          this.auth.verifyAccountExist(user.user.uid).then(
            existe => {
              if (existe) {
                this.navCtrl.setRoot(MenuPage)
              } else {
                this.auth.verifyAccountExist(user.user.uid).then(
                  existe => {
                    if (existe) {
                      this.navCtrl.setRoot(MenuPage)
                    } else {
                      this.navCtrl.push(TypeOfUserPage, {
                        key: user.user.uid,
                        provider: 'google'
                      });
                    }
                  }
                )
              }
            }
          );
        })
        .catch(error => {
          this.alertCtrl.create({
            title: 'No existe usuario',
            subTitle: 'Cree una cuenta nueva para poder ingresar',
            buttons: ['Aceptar']
          }).present();
          console.log("Firebase failure: " + JSON.stringify(error))
        });
    }).catch(err => {
      console.error("Error: " + JSON.stringify(err))
      this.googlePlus.disconnect();
    });
  }

  signInWithFacebook() {
    if (this.platform.is('cordova')) {
      // Cellphone
      this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        firebase.auth().signInAndRetrieveDataWithCredential(facebookCredential)
          .then(user => {
            console.log(user);
            this.auth.verifyAccountExist(user.user.uid)
              .then(existe => {
                existe ? this.navCtrl.setRoot(MenuPage) : this.navCtrl.push(TypeOfUserPage, {
                  key: user.user.uid,
                  provider: 'google'
                });
              })
              .catch(error => {
                this.alertCtrl.create({
                  title: 'No existe usuario',
                  subTitle: 'Cree una cuenta nueva para poder ingresar',
                  buttons: ['Aceptar']
                }).present();
                console.log("Firebase failure: " + JSON.stringify(error))
              });
          })
          .then(() => this.navCtrl.setRoot(MenuPage))
          .catch(err => console.log(err))
        //   this.navCtrl.setRoot(MenuPage);
        // }).catch(e => console.log('Error con el login' + JSON.stringify(e)));
      })
    } else {
      // Desktop
      this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => {
          console.log(res);
        });
    }
  }

}
