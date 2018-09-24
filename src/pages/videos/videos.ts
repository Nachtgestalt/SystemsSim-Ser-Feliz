import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RelaxProvProvider} from "../../providers/relax-prov/relax-prov";
import {UserProvider} from "../../providers/user/user";

@IonicPage()
@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html',
})
export class VideosPage {

  videos = [];
  idDocument = '';
  videoUrl = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public _relaxProv: RelaxProvProvider,
              public _userProv: UserProvider) {
    this._userProv.getIdDocument().then(
      (data: string) => {
        this.idDocument = data;
        console.log('Id Document: ', this.idDocument);
        this._relaxProv.loadDataPatient(this.idDocument, 'video').subscribe(
          res => {
            this.videos = res;
          }
        )
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideosPage');
  }

  showVideo(id) {
    this.videoUrl = id;
  }

}
