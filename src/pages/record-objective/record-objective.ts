import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import * as moment from "moment";
import {ELocalNotificationTriggerUnit, ILocalNotification, LocalNotifications} from "@ionic-native/local-notifications";
import {RelaxProvProvider} from "../../providers/relax-prov/relax-prov";
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-record-objective',
  templateUrl: 'record-objective.html',
})
export class RecordObjectivePage {
  title: any;
  notifyTime: any;
  startDay: any;
  endDay: any;
  chosenHours: number;
  chosenMinutes: number;
  notifications: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private storage: Storage,
              public viewCtrl: ViewController,
              private platform: Platform,
              public localNotifications: LocalNotifications,
              public alertCtrl: AlertController,
              public _relaxProv: RelaxProvProvider) {
    this.notifyTime = moment(new Date()).format();
    this.chosenHours = new Date().getHours();
    this.chosenMinutes = new Date().getMinutes();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecordObjectivePage');
  }

  timeChange(time) {
    console.log('Tiempo: ', time);
    this.chosenHours = time.hour;
    this.chosenMinutes = time.minute;
    console.log(this.chosenHours, this.chosenMinutes);
  }

  addNotifications() {
    let idNotification;
    let mEndDay = moment(this.endDay).set({h: this.chosenHours, m: this.chosenMinutes});
    let mStartDay = moment(this.startDay).set({h: this.chosenHours, m: this.chosenMinutes});
    let copyStartDay = moment(this.startDay).set({h: this.chosenHours, m: this.chosenMinutes});
    let daysDiff = mEndDay.diff(mStartDay, 'days');
    console.log('Dias de diferencia: ', typeof daysDiff);
    const data = {
      creado: this._relaxProv.timestamp,
      fecha_inicio: mStartDay.toDate(),
      fecha_termino: mEndDay.toDate(),
      actualizado: copyStartDay.subtract(1, 'days').toDate(),
      titulo: this.title,
      porcentaje: 0,
      dias_a_cumplir: daysDiff,
      dias_cumplidos: 0,
      estado: 'no cumplido'
    };

    this.getIdNotification().then(
      val => idNotification = val
    );


    if (this.platform.is('cordova')) {
      this._relaxProv.recordObjective(data).then(
        (response) => {
          console.log(response.id);
          let notification: ILocalNotification = {
            id: idNotification + 1,
            title: 'Hey!',
            text: `¿Realizaste la actividad "${this.title}"?`,
            trigger: {
              firstAt: mStartDay.subtract(1, 'days').toDate(),
              every: ELocalNotificationTriggerUnit.DAY,
              count: daysDiff - 1
            },
            actions: [
              {id: 'yes', title: 'Si'},
              {id: 'no', title: 'No'}
            ],
            data: {
              idDocument: response.id
            }
          };

          this.setIdNotification(idNotification + 1);
          this.localNotifications.schedule(notification);
          let alert = this.alertCtrl.create({
            title: 'Objetivo guardado',
            buttons: ['Ok']
          });
          alert.present();
          this.viewCtrl.dismiss();
        }
      );
    }
  }

  getIdNotification() {
    const promise = new Promise((resolve, reject) => {
      this.storage.get('idNotification').then(
        val => resolve(val)
      ).catch(
        () => {
          this.setIdNotification(1);
          reject(1);
        }
      );
    });
    return promise;
  }

  setIdNotification(idNotification) {
    this.storage.set('idNotification', idNotification)
  }
}
