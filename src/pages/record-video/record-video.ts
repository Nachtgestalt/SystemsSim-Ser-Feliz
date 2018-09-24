import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {FormControl, FormGroup} from "@angular/forms";
import {RelaxProvProvider} from "../../providers/relax-prov/relax-prov";

@IonicPage()
@Component({
  selector: 'page-record-video',
  templateUrl: 'record-video.html',
})
export class RecordVideoPage {

  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController,
              private toast: ToastController,
              public _relaxProv: RelaxProvProvider) {
    this.createFormGroup();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecordVideoPage');
  }

  createFormGroup() {
    this.form = new FormGroup({
      'id': new FormControl(),
      'titulo': new FormControl(),
      'descripcion': new FormControl(),
    })
  }

  recordVideo() {
    this._relaxProv.recordVideo(this.form.value)
      .then(
        () => {
          this.presentToast('Video registrado con exito')
          this.dismiss();
        }
      ).catch(
      () => this.presentToast('Error al registrar video')
    );
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  presentToast(message) {
    const toast = this.toast.create(
      {
        message: message,
        position: 'bottom',
        duration: 2000
      }
    );
    toast.present();
  }


}
