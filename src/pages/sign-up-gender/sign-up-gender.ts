import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore} from "angularfire2/firestore";
import {SignUpTelephonePage} from "../sign-up-telephone/sign-up-telephone";

@IonicPage()
@Component({
  selector: 'page-sign-up-gender',
  templateUrl: 'sign-up-gender.html',
})
export class SignUpGenderPage {

  form: FormGroup;
  usuario: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private afs: AngularFirestore) {
    this.usuario = navParams.get('usuario');
    console.log(this.navParams.data);
    this.form = new FormGroup({
      'sexo': new FormControl('hombre', Validators.required)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpGenderPage');
  }

  goToSignUpCredentials() {
    let usuario = this.navParams.get('usuario');
    usuario.sexo = this.form.get('sexo').value;
    console.log(usuario);
      this.navCtrl.push(SignUpTelephonePage, {
        usuario: usuario
      });
    // if (usuario.provider === 'email') {
    //   this.navCtrl.push(SignUpCredentialsPage, {
    //     usuario: usuario
    //   });
    // } else {
    //   this.createUser().then(
    //     () => this.navCtrl.setRoot(MenuPage),
    //     error => console.log('Error al registrar: ' + JSON.stringify(error))
    //   )
    // }
  }

  createUser() {
    let source = this.usuario.tipoUsuario;
    console.log(JSON.stringify(this.usuario));
    return this.afs.collection(source).add(this.usuario);
  }

}
