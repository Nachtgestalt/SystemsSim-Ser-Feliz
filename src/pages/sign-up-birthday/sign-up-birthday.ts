import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SignUpGenderPage} from "../sign-up-gender/sign-up-gender";
import {FormControl, FormControlName, FormGroup, Validators} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-sign-up-birthday',
  templateUrl: 'sign-up-birthday.html',
})
export class SignUpBirthdayPage {
  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams.data);
    this.form = new FormGroup({
      'fecha_nacimiento': new FormControl('', Validators.required)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpBirthdayPage');
  }

  goToSignUpGender() {
    let tipoUsuario = this.navParams.get('tipoUsuario');
    let nombre = this.navParams.get('nombre');
    let apellidos = this.navParams.get('apellidos');
    let fecha_nacimiento = this.form.get('fecha_nacimiento').value;
    const usuario = {
      tipoUsuario: tipoUsuario,
      nombre: nombre,
      apellidos: apellidos,
      fecha_nacimiento: fecha_nacimiento
    };
    console.log(this.form.get('fecha_nacimiento').value);
    this.navCtrl.push(SignUpGenderPage, {
      usuario: usuario
    });
  }

}
