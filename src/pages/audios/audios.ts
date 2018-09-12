import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RelaxProvProvider} from "../../providers/relax-prov/relax-prov";
import {UserProvider} from "../../providers/user/user";

/**
 * Generated class for the AudiosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-audios',
  templateUrl: 'audios.html',
})
export class AudiosPage {
  audios = [];
  idDocument = '';
  audioUrl = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public _relaxProv: RelaxProvProvider,
              public _userProv: UserProvider) {
    this._userProv.getIdDocument().then(
      (data: string) => {
        this.idDocument = data;
        console.log('Id Document: ', this.idDocument);
        this._relaxProv.loadDataPatient(this.idDocument, 'audio').subscribe(
          res => {
            this.audios = res;
          }
        )
      }
    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AudiosPage');
  }

  play(url) {
    this.audioUrl = url
  }

}
