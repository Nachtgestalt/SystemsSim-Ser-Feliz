import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {VideosPage} from "../videos/videos";
import {AudiosPage} from "../audios/audios";
import {ObjectivesPage} from "../objectives/objectives";
import {Storage} from "@ionic/storage";
import {VideosTherapistPage} from "../videos-therapist/videos-therapist";
import {AudiosTherapistPage} from "../audios-therapist/audios-therapist";
import {UserProvider} from "../../providers/user/user";

/**
 * Generated class for the RelaxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-relax',
  templateUrl: 'relax.html',
})
export class RelaxPage {
  idDocument = '';
  typeUser = '';
  tab1Root;
  tab2Root;
  tab3Root;
  isReady = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private storage: Storage,
              private platform: Platform,
              public _userProv: UserProvider) {
  }

  ionViewWillEnter() {
  }

  ionViewDidLoad() {
    this._userProv.getTypeUser().then(
      (data: string) => {
        console.log(data);
        this.typeUser = data;
        console.log('Tipo de usuario: ', this.typeUser);
        console.log('ionViewDidLoad RelaxPage');
        if (this.typeUser === 'usuarios') {
          console.log('Dentro de if usuarios', this.typeUser);
          this.tab1Root = VideosPage;
          this.tab2Root = AudiosPage;
          this.tab3Root = ObjectivesPage;
          this.isReady = true
        } else {
          console.log('Dentro de else usuarios', this.typeUser);
          this.tab1Root = VideosTherapistPage;
          this.tab2Root = AudiosTherapistPage;
          this.isReady = true
        }
      }
    );
  }

}
