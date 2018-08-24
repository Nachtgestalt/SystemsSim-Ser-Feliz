import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SignUpProfessionalInfoPage} from "../sign-up-professional-info/sign-up-professional-info";
import {COUNTRIES} from "../../config";

@IonicPage()
@Component({
  selector: 'page-sign-up-personal-information',
  templateUrl: 'sign-up-personal-information.html',
})
export class SignUpPersonalInformationPage {

  user: any;
  form: FormGroup;
  countries = COUNTRIES;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.countries);
    this.user = this.navParams.get('usuario');
    this.form = new FormGroup({
      'ubicacion': new FormGroup({
        direccion: new FormControl('', Validators.required),
        ciudad: new FormControl('', Validators.required),
        pais: new FormControl('', Validators.required)
      }),
      'rfc': new FormControl('', Validators.required),
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPersonalInformationPage');
  }

  goToNextStep() {
    this.user.direccion = this.form.get('ubicacion').value;
    this.user.direccion.ciudad = this.user.direccion.ciudad.toLowerCase();
    this.user.rfc = this.form.get('rfc').value;

    this.navCtrl.push(SignUpProfessionalInfoPage, {
      usuario: this.user
    });
  }

}
