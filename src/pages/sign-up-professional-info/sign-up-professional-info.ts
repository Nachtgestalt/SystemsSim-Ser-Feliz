import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SignUpCredentialsPage} from "../sign-up-credentials/sign-up-credentials";
import {MenuPage} from "../menu/menu";
import {AngularFirestore} from "angularfire2/firestore";


@IonicPage()
@Component({
  selector: 'page-sign-up-professional-info',
  templateUrl: 'sign-up-professional-info.html',
})
export class SignUpProfessionalInfoPage {

  user: any;
  form: FormGroup;
  msgButton: string;

  professions = [
    {value: 'psicología', viewValue: 'Psicología'},
    {value: 'psiquiatria', viewValue: 'Psiquiatria'},
    {value: 'coach', viewValue: 'Coach'},
    {value: 'otro', viewValue: 'Otro'},
    ];

  specializations = [
    {value: 'crisis_nerviosas', viewValue: 'Crisis nerviosas'},
    {value: 'depresion', viewValue: 'Depresión'},
    {value: 'ataques_panico', viewValue: 'Ataques de pánico'},
    {value: 'transtornos_nutricion', viewValue: 'Transtornos de nutrición'},
    {value: 'adolescencia', viewValue: 'Adolescencia'},
    {value: 'adultos_mayores', viewValue: 'Adultos mayores'},
    {value: 'ninos', viewValue: 'Niños'},
    {value: 'bullying', viewValue: 'Bullying'},
    {value: 'adicciones', viewValue: 'Adicciones'},
    {value: 'pareja_familia', viewValue: 'Pareja y familia'},
    {value: 'sexologia', viewValue: 'Sexología'},
    {value: 'otro', viewValue: 'Otro'},
  ];

  universities = [
    {value: 'ibero', viewValue: 'Ibero'},
    {value: 'La Salle', viewValue: 'La Salle'},
    {value: 'Anahuac', viewValue: 'Anahuac'},
    {value: 'Intercontinental', viewValue: 'Intercontinental'},
    {value: 'UNAM', viewValue: 'UNAM'},
    {value: 'UAM', viewValue: 'UAM'},
    {value: 'ULA', viewValue: 'ULA'},
    {value: 'Centro Eleia', viewValue: 'Centro Eleia'},
    {value: 'Del Pedregal', viewValue: 'Del Pedregal'},
    {value: 'UVM', viewValue: 'UVM'},
    {value: 'otra', viewValue: 'Otra'},
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private afs: AngularFirestore) {
    this.user = this.navParams.get('usuario');
    this.user.provider === 'email' ? this.msgButton = 'Siguiente' : this.msgButton = 'Registrarte' ;
    this.form = new FormGroup({
      'profesion': new FormControl('', Validators.required),
      'otra_profesion': new FormControl(''),
      'especialidad': new FormControl('', Validators.required),
      'otra_especialidad': new FormControl(''),
      'universidad': new FormControl('', Validators.required),
      'otra_universidad': new FormControl('')
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpProfessionalInfoPage');
  }

  goToNextStep() {
    this.user.informacion_profesional = this.form.value;
    if (this.user.provider === 'email') {
      this.navCtrl.push(SignUpCredentialsPage, {
        usuario: this.user
      });
    } else {
      this.createUser().then(
        () => this.navCtrl.setRoot(MenuPage),
        error => console.log('Error al registrar: ' + JSON.stringify(error))
      )
    }
  }

  createUser() {
    console.log(this.user);
    return this.afs.collection('terapeutas').add(this.user);
  }




}
