import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthProvider} from "../../providers/auth/auth";
import {WelcomePage} from "../welcome/welcome";
import {AngularFirestore} from "angularfire2/firestore";
import {UserProvider} from "../../providers/user/user";

@IonicPage()
@Component({
  selector: 'page-sign-up-credentials',
  templateUrl: 'sign-up-credentials.html',
})
export class SignUpCredentialsPage {

  form: FormGroup;
  usuario: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private auth: AuthProvider,
              private afs: AngularFirestore,
              public _userProv: UserProvider) {
    this.usuario = navParams.get('usuario');
    console.log(navParams.data);
    this.form = new FormGroup({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpCredentialsPage');
  }

  signUpApp() {
    let data = this.form.value;
    let credentials = {
      email: data.email,
      password: data.password
    };
    let loading = this.loadingCtrl.create({
      content: 'Creando cuenta'
    });
    let alertContent = {
      title: 'Cuenta creada',
      subTitle: 'Inicia sesión',
      buttons: ['Aceptar']
    };
    this.auth.signUp(credentials)
      .then((data: any) => {
          this.usuario.key = data.user.uid;
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
            });
        });
  }
}
