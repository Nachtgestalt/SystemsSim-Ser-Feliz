import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ChatPage} from "../chat/chat";
import {MenuPage} from "../menu/menu";

@IonicPage()
@Component({
  selector: 'page-messaging',
  templateUrl: 'messaging.html',
})
export class MessagingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagingPage');
  }

  goToChat(isNewMatch = false) {
    this.navCtrl.push(ChatPage, {isNewMatch: isNewMatch});
  }

  goToMenu() {
    this.navCtrl.pop( {
      direction: 'back'
    });
  }

}
