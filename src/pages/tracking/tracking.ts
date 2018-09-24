import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {Subscription} from "rxjs/Rx";
import * as moment from "moment";
import {TrackingProvider} from "../../providers/tracking/tracking";
import {TrackingChartsPage} from "../tracking-charts/tracking-charts";

@IonicPage()
@Component({
  selector: 'page-tracking',
  templateUrl: 'tracking.html',
})
export class TrackingPage {

  user: any;
  subscription: Subscription;

  dateNow = moment().toJSON();
  dayNow = moment().locale('es').format('dddd');

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private toastCtrl: ToastController,
              public _userProv: UserProvider,
              public _trackingProv: TrackingProvider) {
    console.log(this.dateNow);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackingPage');
  }

  ionViewCanEnter() {
    console.log('ionViewCanEnter MePage');
    this._userProv.getUser().then(user => {
      this._userProv.getUser$(user)
        .subscribe(data => this.user = data[0],
          error1 => console.error(error1));
    });
    // this._userProv.loadStorage().then( existe => {
    //   if ( existe ) {
    //     console.log('Cargo el storage!');
    //   }
    // });
    //
    // this.subscription = this._userProv.user$.subscribe(
    //   data => {
    //     this.user = data[0];
    //     console.log('Observable user' + JSON.stringify(data));
    //   },
    //   error1 => console.log(JSON.stringify(error1))
    // );
  }

  rating(value) {
    this._trackingProv.setTracking(value)
      .then(
      () => {
        console.log('Guardado correctamente');
        this.presentToast();
        this.goToTrackingCharts();
      }
      )
      .catch(
        error => console.log('Error al guardar', error)
      );
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Guardado...',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  goToTrackingCharts() {
    this.navCtrl.push(TrackingChartsPage);
  }

}
