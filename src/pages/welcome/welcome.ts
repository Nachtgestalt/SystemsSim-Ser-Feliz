import {Component, ViewChild} from '@angular/core';
import {App, IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import {ExplorePage} from "../explore/explore";
import {UserProvider} from "../../providers/user/user";

import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import {Platform} from 'ionic-angular';
import {Facebook} from '@ionic-native/facebook';
import {GooglePlus} from '@ionic-native/google-plus';
import {MenuPage} from "../menu/menu";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthProvider} from "../../providers/auth/auth";
import {TypeOfUserPage} from "../type-of-user/type-of-user";

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  loginForm: FormGroup;
  loginError: string;

  introSlides: any;
  @ViewChild('slides') slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App,
              private afAuth: AngularFireAuth,
              public userProv: UserProvider,
              private fb: Facebook,
              private platform: Platform,
              private googlePlus: GooglePlus,
              public auth: AuthProvider) {
    this.introSlides = [
      {
        title: 'Descubre nuevos e interesantes <br> expertos cerca',
        image: 'assets/img/intro/intro_1.png'
      },
      {
        title: 'Desliza hacia la derecha para contactar a alguien <br /> ó desliza hacia la izquierda para pasar',
        image: 'assets/img/intro/intro_2.png'
      },
      {
        title: 'Si tambien deslizan hacia la derecha <br /> entonces es un match!',
        image: 'assets/img/intro/intro_3.png'
      },
      {
        title: 'Solo gente con la que hagas match <br /> pueden hablar contigo',
        image: 'assets/img/intro/intro_4.png'
      }
    ]

    this.loginForm = new FormGroup({
      'email': new FormControl('', Validators.compose([Validators.required, Validators.email])),
      'password': new FormControl('',
        Validators.compose([Validators.required]))
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  goToSwipe() {
    this.app.getRootNav().setRoot(MenuPage)
      .then(() => {
        console.log('Welcome to your ExplorePage!');
      })
  }

  goToSignUp() {
    this.navCtrl.push(TypeOfUserPage, {}, {
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
        .then(
          () => this.navCtrl.setRoot(MenuPage),
          error => this.loginError = error.message
        );
  }

  signInGoogle() {
    this.googlePlus.login({
      'webClientId': '1031764141009-lh0b5cj7fiqcquih0cjisbeuhqt6dkdq.apps.googleusercontent.com',
      'offline': true
    }).then(res => {
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        .then(user => {
          console.log("Firebase success: " + JSON.stringify(user));
          this.userProv.loadUser(user.displayName,
            user.email,
            user.photoURL,
            user.uid,
            'google');
          this.navCtrl.setRoot(ExplorePage);
        })
        .catch(error => console.log("Firebase failure: " + JSON.stringify(error)));
    }).catch(err => console.error("Error: ", JSON.stringify(err)));
  }

  signInWithFacebook() {
    if (this.platform.is('cordova')) {
      // Cellphone
      this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCredential)
          .then(user => {
            console.log(user);
            this.userProv.loadUser(user.displayName,
              user.email,
              user.photoURL,
              user.uid,
              'facebook');
            this.navCtrl.setRoot(ExplorePage);
          }).catch(e => console.log('Error con el login' + JSON.stringify(e)));
      })
    } else {
      // Desktop
      this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => {
          console.log(res);
          let user = res.user;
          this.userProv.loadUser(user.displayName,
            user.email,
            user.photoURL,
            user.uid,
            'facebook');
        });
    }
  }

}
