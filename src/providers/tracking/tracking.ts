import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import * as moment from "moment";
import {Platform} from "ionic-angular";
import {Subscription} from "rxjs/Rx";
import {map} from 'rxjs/operators';


@Injectable()
export class TrackingProvider {

  trackingCollectionToCharts: AngularFirestoreCollection<any>;
  trackingCollection: AngularFirestoreCollection<any>;
  trackingDocToday: AngularFirestoreDocument<any>;
  data$: Subscription;
  idDocument: string;
  typeUser: string;
  trackingToday = {};

  dateNow = moment().toDate();
  dateBeforeWeek = moment().subtract(7, 'days').toDate();

  fileName: string = moment().format('DD-MMMM-YYYY');

  constructor(private storage: Storage,
              private afS: AngularFirestore,
              private platform: Platform) {
    this.getTrackingToday();
  }

  getTrackingToday() {
    let subscription: Subscription;
    if (this.platform.is('cordova')) {
      this.storage.get('idDocument').then(val => {
        if (val) {
          this.idDocument = val;
        }
      });

      this.storage.get('typeUser').then(val => {
        if (val) {
          this.typeUser = val;
        }
      });
    } else {
      this.idDocument = localStorage.getItem('idDocument');
      this.typeUser = localStorage.getItem('typeUser');
    }
    this.trackingDocToday = this.afS.collection(`${this.typeUser}`).doc(`${this.idDocument}`)
      .collection('seguimiento').doc(this.fileName);

    this.trackingDocToday.valueChanges()
      .subscribe(
        res => {
          console.log('Data del documento de hoy: ', res);
          if(!res) {
            console.error('No hay data');
            this.trackingToday = {
              'Estupendo': 0,
              'Muy bien': 0,
              'Bien': 0,
              'Regular': 0,
              'No bien': 0,
              'Mal': 0,
              'Desastroso': 0
            };
          } else {
            this.trackingToday = res;
          }
          console.log(this.trackingToday);
          // subscription.unsubscribe();
        }
      )
  }

  setTracking(value) {
    let fileName: string = moment().format('DD-MMMM-YYYY');
    console.log('Value: ', value);
    if (this.platform.is('cordova')) {
      this.storage.get('idDocument').then(val => {
        if (val) {
          this.idDocument = val;
        }
      });

      this.storage.get('typeUser').then(val => {
        if (val) {
          this.typeUser = val;
        }
      });
    } else {
      this.idDocument = localStorage.getItem('idDocument');
      this.typeUser = localStorage.getItem('typeUser');
    }

    this.trackingCollection = this.afS.collection(`${this.typeUser}`).doc(`${this.idDocument}`)
      .collection('seguimiento');

    return new Promise((resolve, reject) => {
      console.log('Tracking today: ', this.trackingToday);
      let data = this.trackingToday;
      data[value] = data[value] + 1;
      data['fecha'] = new Date();
      console.log(data);
      this.trackingCollection.doc(fileName).set(data)
        .then(
        () => resolve()
      )
        .catch(
          error => {
            console.log(error);
            reject()
          }
        )
    });
  }

  getTrackingData() {
    this.trackingCollectionToCharts = this.afS.collection(`${this.typeUser}`).doc(`${this.idDocument}`)
      .collection('seguimiento', ref => {
        return ref
          .where('fecha', '>=', this.dateBeforeWeek)
          .where('fecha', '<=', this.dateNow)
          .orderBy('fecha', 'asc')
      });

    return this.trackingCollectionToCharts.valueChanges()
      .pipe(
        map(
          (res: any) => {
            for (let seguimiento of res) {
              seguimiento.fecha = moment.unix(seguimiento.fecha.seconds).locale('es').format("DD MMMM") //parse integer
            }
            return res;
          }
        )
      );
  }

}
