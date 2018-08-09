import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SignUpContactPersonPage} from "../sign-up-contact-person/sign-up-contact-person";
import {SignUpPersonalInformationPage} from "../sign-up-personal-information/sign-up-personal-information";

@IonicPage()
@Component({
  selector: 'page-sign-up-telephone',
  templateUrl: 'sign-up-telephone.html',
})
export class SignUpTelephonePage {

  form: FormGroup;
  usuario: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.usuario = navParams.get('usuario');
    this.form = new FormGroup({
      'telefono': new FormControl('', Validators.required)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpTelephonePage');
  }

  goToNextStep() {
    this.usuario.telefono = this.form.get('telefono').value;
    if (this.usuario.tipoUsuario === 'usuarios') {
      this.navCtrl.push(SignUpContactPersonPage, {
        usuario: this.usuario
      })
    } else {
      this.navCtrl.push(SignUpPersonalInformationPage, {
        usuario: this.usuario
      })
    }
  }

}
