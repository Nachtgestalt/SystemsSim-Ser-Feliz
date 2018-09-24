import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {VideosPage} from "../videos/videos";
import {AudiosPage} from "../audios/audios";
import {ObjectivesPage} from "../objectives/objectives";
import {VideosTherapistPage} from "../videos-therapist/videos-therapist";
import {AudiosTherapistPage} from "../audios-therapist/audios-therapist";
import {UserProvider} from "../../providers/user/user";

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
