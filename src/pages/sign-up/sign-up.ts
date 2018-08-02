import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WelcomePage} from "../welcome/welcome";
import {AuthProvider} from "../../providers/auth/auth";

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  signupError: string;
  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private auth: AuthProvider) {
    this.form = new FormGroup({
      'email': new FormControl('', Validators.compose([Validators.required, Validators.email])),
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  signup() {
    let data = this.form.value;
    let credentials = {
      email: data.email,
      password: data.password
    };
    this.auth.signUp(credentials).then(
      () => this.navCtrl.setRoot(WelcomePage),
      error => this.signupError = error.message
    );
  }

}
