import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SignUpCredentialsPage} from "../sign-up-credentials/sign-up-credentials";

/**
 * Generated class for the SignUpGenderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up-gender',
  templateUrl: 'sign-up-gender.html',
})
export class SignUpGenderPage {

  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams);
    this.form = new FormGroup({
      'sexo': new FormControl('hombre', Validators.required)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpGenderPage');
  }

  goToSignUpCredentials() {
    let usuario = this.navParams.get('usuario');
    usuario.sexo = this.form.get('sexo').value;
    console.log(usuario);
    this.navCtrl.push(SignUpCredentialsPage, {
      usuario: usuario
    });

  }

}
