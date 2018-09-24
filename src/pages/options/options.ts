import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {WelcomePage} from "../welcome/welcome";

@IonicPage()
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionsPage');
  }

  logout() {
    this.auth.signOut()
      .then(
        () => this.navCtrl.setRoot(WelcomePage)
      );

  }

}
