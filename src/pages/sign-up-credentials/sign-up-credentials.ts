import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthProvider} from "../../providers/auth/auth";
import {WelcomePage} from "../welcome/welcome";
import {AngularFirestore} from "angularfire2/firestore";
import {MenuPage} from "../menu/menu";

@IonicPage()
@Component({
  selector: 'page-sign-up-credentials',
  templateUrl: 'sign-up-credentials.html',
})
export class SignUpCredentialsPage {

  form: FormGroup;
  usuario: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private auth: AuthProvider,
              private afs: AngularFirestore) {
    this.usuario = navParams.get('usuario');
    console.log(navParams.data);
    this.form = new FormGroup({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpCredentialsPage');
  }

  signUpApp() {
    let data = this.form.value;
    let credentials = {
      email: data.email,
      password: data.password
    };
    this.auth.signUp(credentials).then(
      (data: any) => {
        let id = data.user.uid;
        console.log(data);
        this.createUser(id).then(
          () => this.navCtrl.setRoot(MenuPage),
          error => console.log(error)
        )
      },
      error => console.log(error)
    );
  }

  createUser(id) {
    this.usuario.key = id;
    console.log(this.usuario);
    return this.afs.collection('usuarios').add(this.usuario);
  }

}
