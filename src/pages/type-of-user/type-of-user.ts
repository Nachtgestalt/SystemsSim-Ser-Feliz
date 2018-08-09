import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SignUpNamePage} from "../sign-up-name/sign-up-name";

/**
 * Generated class for the TypeOfUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-type-of-user',
  templateUrl: 'type-of-user.html',
})
export class TypeOfUserPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TypeOfUserPage');
  }

  goToSignUpName(typeOfUser) {
    this.navCtrl.push(SignUpNamePage, {
      key: this.navParams.get('key'),
      provider: this.navParams.get('provider'),
      tipoUsuario: typeOfUser
    });
  }

}
