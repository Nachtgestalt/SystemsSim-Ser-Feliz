import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BadgesProvProvider} from "../../providers/badges-prov/badges-prov";
import {RelaxProvProvider} from "../../providers/relax-prov/relax-prov";

@IonicPage()
@Component({
  selector: 'page-badges',
  templateUrl: 'badges.html',
})
export class BadgesPage {
  idDocument = '';
  badges = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public _badgesProv: BadgesProvProvider,
              public _relaxProv: RelaxProvProvider) {
    this.idDocument = this.navParams.get('idDocument');
    this._relaxProv.loadBadges(this.idDocument).subscribe(badges => {
      this.badges = badges;
    })
    // this._badgesProv.loadBadges(this.idDocument).subscribe(
    //   badges => {
    //     this.badges = badges;
    //   }
    // )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BadgesPage');
  }

}
