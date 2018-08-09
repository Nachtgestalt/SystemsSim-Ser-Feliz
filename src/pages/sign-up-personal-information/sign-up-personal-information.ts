import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SignUpProfessionalInfoPage} from "../sign-up-professional-info/sign-up-professional-info";

@IonicPage()
@Component({
  selector: 'page-sign-up-personal-information',
  templateUrl: 'sign-up-personal-information.html',
})
export class SignUpPersonalInformationPage {

  user: any;
  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get('usuario');
    this.form = new FormGroup({
      'direccion': new FormControl('', Validators.required),
      'rfc': new FormControl('', Validators.required),
      'cedula_profesional': new FormControl('', Validators.required)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPersonalInformationPage');
  }

  goToNextStep() {
    this.user.direccion = this.form.get('direccion').value;
    this.user.rfc = this.form.get('rfc').value;
    this.user.cedula_profesional = this.form.get('cedula_profesional').value;

    this.navCtrl.push(SignUpProfessionalInfoPage, {
      usuario: this.user
    });
  }

}
