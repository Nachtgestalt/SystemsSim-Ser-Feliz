import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SignUpCredentialsPage} from "../sign-up-credentials/sign-up-credentials";
import {AngularFirestore} from "angularfire2/firestore";
import {WelcomePage} from "../welcome/welcome";
import {UserProvider} from "../../providers/user/user";


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
    {value: 'Psicología', viewValue: 'Psicología'},
    {value: 'Psiquiatria', viewValue: 'Psiquiatria'},
    {value: 'Coach', viewValue: 'Coach'},
    {value: 'Otro', viewValue: 'Otro'},
  ];

  specializations = [
    {value: 'Crisis Nerviosas', viewValue: 'Crisis nerviosas'},
    {value: 'Depresion', viewValue: 'Depresión'},
    {value: 'Ataques de pánico', viewValue: 'Ataques de pánico'},
    {value: 'Transtornos de Nutrición', viewValue: 'Transtornos de nutrición'},
    {value: 'Adolescencia', viewValue: 'Adolescencia'},
    {value: 'Adultos ayores', viewValue: 'Adultos mayores'},
    {value: 'Niños', viewValue: 'Niños'},
    {value: 'Bullying', viewValue: 'Bullying'},
    {value: 'Adicciones', viewValue: 'Adicciones'},
    {value: 'Pareja y familia', viewValue: 'Pareja y familia'},
    {value: 'Sexologia', viewValue: 'Sexología'},
    {value: 'Otro', viewValue: 'Otro'},
  ];

  universities = [
    {value: 'Ibero', viewValue: 'Ibero'},
    {value: 'La Salle', viewValue: 'La Salle'},
    {value: 'Anahuac', viewValue: 'Anahuac'},
    {value: 'Intercontinental', viewValue: 'Intercontinental'},
    {value: 'UNAM', viewValue: 'UNAM'},
    {value: 'UAM', viewValue: 'UAM'},
    {value: 'ULA', viewValue: 'ULA'},
    {value: 'Centro Eleia', viewValue: 'Centro Eleia'},
    {value: 'Del Pedregal', viewValue: 'Del Pedregal'},
    {value: 'UVM', viewValue: 'UVM'},
    {value: 'Otra', viewValue: 'Otra'},
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public _userProv: UserProvider) {
    this.user = this.navParams.get('usuario');
    this.user.provider === 'email' ? this.msgButton = 'Siguiente' : this.msgButton = 'Registrarte';
    this.form = new FormGroup({
      'cedula_profesional': new FormControl('', Validators.required),
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
    let loading = this.loadingCtrl.create({
      content: 'Creando cuenta'
    });
    let alertContent = {
      title: 'Cuenta creada',
      subTitle: 'Inicia sesión',
      buttons: ['Aceptar']
    };
    this.user.informacion_profesional = this.form.value;
    if (this.user.provider === 'email') {
      this.navCtrl.push(SignUpCredentialsPage, {
        usuario: this.user
      });
    } else {
      this._userProv.createUser(this.user)
        .then(() => loading.dismiss())
        .then(() => this.alertCtrl.create(alertContent).present())
        .then(() => this.navCtrl.setRoot(WelcomePage))
        .catch(error => {
          this.alertCtrl.create({
            title: 'Error al crear usuario',
            subTitle: 'Intente más tarde',
            buttons: ['Aceptar']
          }).present();
          console.log(error)
        });
    }
  }
}
