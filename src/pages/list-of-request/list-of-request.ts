import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {TherapistsProvider} from "../../providers/therapists/therapists";
import {MessagingPage} from "../messaging/messaging";

@IonicPage()
@Component({
  selector: 'page-list-of-request',
  templateUrl: 'list-of-request.html',
})
export class ListOfRequestPage {
  requests;
  idDocument;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public _therapistProv: TherapistsProvider) {
    this.idDocument = this.navParams.get('idDocument');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListOfRequestPage');
    this._therapistProv.getPatientsRequest(this.idDocument)
      .subscribe(
        res => {
          console.log(res);
          this.requests = res;
        }
      )
  }


  confirmRequest(request) {
    console.log(request);
    this._therapistProv.confirmRequest(request, this.idDocument);
  }

  goToMessaging() {
    this.navCtrl.push(MessagingPage, {}, {
      direction: 'forward'
    });
  }

}
