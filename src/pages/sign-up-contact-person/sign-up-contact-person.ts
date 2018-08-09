import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MenuPage} from "../menu/menu";
import {SignUpCredentialsPage} from "../sign-up-credentials/sign-up-credentials";
import {AngularFirestore} from "angularfire2/firestore";

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
      this.createUser().then(
        () => this.navCtrl.setRoot(MenuPage),
        error => console.log('Error al registrar: ' + JSON.stringify(error))
      )
    }
  }

  createUser() {
    console.log(this.usuario);
    return this.afs.collection('usuarios').add(this.usuario);
  }

}
