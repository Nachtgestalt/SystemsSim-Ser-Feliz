import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SignUpBirthdayPage} from "../sign-up-birthday/sign-up-birthday";

/**
 * Generated class for the SignUpNamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up-name',
  templateUrl: 'sign-up-name.html',
})
export class SignUpNamePage {

  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.form = new FormGroup({
      'nombre': new FormControl('', Validators.required),
      'apellidos': new FormControl('', Validators.required)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpNamePage');
  }

  goToSignUpBirthday() {
    let nombre = this.form.get('nombre').value;
    let apellidos = this.form.get('apellidos').value;
    this.navCtrl.push(SignUpBirthdayPage, {
      key: this.navParams.get('key'),
      provider: this.navParams.get('provider'),
      tipoUsuario: this.navParams.get('tipoUsuario'),
      nombre: nombre,
      apellidos: apellidos
    })
  }

}
