import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {TherapistsProvider} from "../../providers/therapists/therapists";
import {map} from "rxjs/operators";
import {MessagingPage} from "../messaging/messaging";

/**
 * Generated class for the ListOfRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-of-request',
  templateUrl: 'list-of-request.html',
})
export class ListOfRequestPage {
  requests;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public _therapistProv: TherapistsProvider) {
    _therapistProv.getPatientsRequest()
      .subscribe(
        res => {
          console.log(res);
          this.requests = res;
        }
      )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListOfRequestPage');
  }


  confirmRequest(request) {
    console.log(request);
    this._therapistProv.confirmRequest(request);
  }

  goToMessaging() {
    this.navCtrl.push(MessagingPage, {}, {
      direction: 'forward'
    });
  }

}
