import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Platform, ToastController} from "ionic-angular";
import {Storage} from "@ionic/storage";
import {map} from "rxjs/operators";
import {UtilsProvider} from "../utils/utils";

@Injectable()
export class TherapistsProvider {
  therapistCollection: AngularFirestoreCollection<any>;
  requestConsultationCollection: AngularFirestoreCollection<any>;

  idDocument;
  typeUser;

  constructor(public _utilsProv: UtilsProvider,
              private storage: Storage,
              private afS: AngularFirestore,
              private platform: Platform,
              private toast: ToastController) {
    console.log('Hello TherapistsProvider Provider');
  }

  getTherapists() {
    this.therapistCollection = this.afS.collection('terapeutas');
    return this.therapistCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          data.id = a.payload.doc.id;
          data.edad = this._utilsProv.getAgeOnlyYear(data.fecha_nacimiento);
          return data;
        });
      }),
    );
  }

  sentRequest(user) {
    this.loadStorage();
    let id = user.id;
    let dataSent = {};
    let toast;
    dataSent[id] = {
      tipo_solicitud: 'enviado'
    };
    let dataReceive = {};
    dataReceive[this.idDocument] = {
      tipo_solicitud: 'recibido'
    };
    this.requestConsultationCollection = this.afS.collection('solicitudes');

    this.requestConsultationCollection.doc(this.idDocument).update(dataSent)
      .then(
        () => {
          this.requestConsultationCollection.doc(id).update(dataReceive)
            .then(
              () => {
                console.log('Solicitud enviada con exito');
                this.presentToast('Solicitud enviada con exito');
              }
            )
            .catch(
              () => {
                this.requestConsultationCollection.doc(id).set(dataReceive).then(
                  () => {
                    console.log('Solicitud enviada con exito');
                    this.presentToast('Solicitud enviada con exito');
                  }
                )
              }
            )
        })
      .catch(
        () => {
          this.requestConsultationCollection.doc(this.idDocument).set(dataSent)
            .then(
              () => {
                this.requestConsultationCollection.doc(id).update(dataReceive)
                  .then(
                    () => {
                      console.log('Solicitud enviada con exito')
                      this.presentToast('Solicitud enviada con exito');
                    }
                  )
                  .catch(
                    () => {
                      this.requestConsultationCollection.doc(id).set(dataReceive)
                        .then(
                          () => {
                            console.log('Solicitud enviada con exito');
                            this.presentToast('Solicitud enviada con exito');
                          }
                        )
                    }
                  )
              }
            )
            .catch(
              () => {
                console.log('Error al enviar la solicitud');
                this.presentToast('Error al enviar la solicitud');
              }
            )
        }
      )
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

  loadStorage() {
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
  }

}
