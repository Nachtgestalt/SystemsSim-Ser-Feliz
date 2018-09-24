import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SignUpCredentialsPage} from "../sign-up-credentials/sign-up-credentials";
import {WelcomePage} from "../welcome/welcome";
import {UserProvider} from "../../providers/user/user";

@IonicPage()
@Component({
  selector: 'page-sign-up-contact-person',
  templateUrl: 'sign-up-contact-person.html',
})
export class SignUpContactPersonPage {
  form: FormGroup;
  usuario: any;
  msgButton: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public _userProv: UserProvider) {
    this.usuario = navParams.get('usuario');
    this.usuario.provider === 'email' ? this.msgButton = 'Siguiente' : this.msgButton = 'Registrarte';
    console.log(navParams.data);
    this.form = new FormGroup({
      'nombre': new FormControl('', Validators.required),
      'telefono': new FormControl('', Validators.required)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpContactPersonPage');
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
    this.usuario.contacto_emergencias = this.form.value;
    if (this.usuario.provider === 'email') {
      this.navCtrl.push(SignUpCredentialsPage, {
        usuario: this.usuario
      });
    } else {
      this._userProv.createUser(this.usuario)
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
        })
    }
  }
}
