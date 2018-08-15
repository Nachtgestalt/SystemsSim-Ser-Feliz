import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SignUpCredentialsPage} from "../sign-up-credentials/sign-up-credentials";
import {AngularFirestore} from "angularfire2/firestore";
import {WelcomePage} from "../welcome/welcome";

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
              private afs: AngularFirestore) {
    this.usuario = navParams.get('usuario');
    this.usuario.provider === 'email' ? this.msgButton = 'Siguiente' : this.msgButton = 'Registrarte' ;
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
    this.usuario.contacto_emergencias = this.form.value;
    if (this.usuario.provider === 'email') {
      this.navCtrl.push(SignUpCredentialsPage, {
        usuario: this.usuario
      });
    } else {
      let loading = this.loadingCtrl.create({
        content: 'Creando cuenta'
      });
      this.createUser().then(
        () => {
          loading.dismiss();
          this.alertCtrl.create({
            title: 'Cuenta creada',
            subTitle: 'Inicia sesión',
            buttons: ['Aceptar']
          }).present();
          this.navCtrl.setRoot(WelcomePage)
        },
        error => {
          this.alertCtrl.create({
            title: 'Error al crear usuario',
            subTitle: 'Intente más tarde',
            buttons: ['Aceptar']
          }).present();
          console.log(error)
        });
    }
  }

  createUser() {
    console.log(this.usuario);
    return this.afs.collection('usuarios').add(this.usuario);
  }

}
