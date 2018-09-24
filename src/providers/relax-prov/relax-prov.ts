import {Injectable} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentChangeAction
} from "angularfire2/firestore";
import {UserProvider} from "../user/user";
import {Subscription} from "rxjs/Rx";
import {map} from "rxjs/operators";
import * as firebase from "firebase";
import * as moment from "moment";

@Injectable()
export class RelaxProvProvider {
  idDocument;
  videosCollection: AngularFirestoreCollection<any>;
  videosDocument: AngularFirestoreDocument<any>;
  logrosCollection: AngularFirestoreCollection<any>;

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  constructor(private afS: AngularFirestore,
              public _userProv: UserProvider) {
    console.log('Hello RelaxProvProvider Provider');
    this._userProv.getIdDocument().then(
      data => {
        this.idDocument = data;
        console.log('Id Document: ', this.idDocument);
      }
    )
  }

  recordObjective(objectiveData) {
    this.videosCollection = this.afS.collection('objetivos');
    objectiveData.badge50 = false;
    objectiveData.badge100 = false;
    objectiveData.id_usuario = this.idDocument;
    return this.videosCollection.add(objectiveData)
  }

  testUpdateObjective(idDocument) {
    this.logrosCollection = this.afS.collection(`logros`);
    console.log('Fechas del servidor: ', this.timestamp);
    console.log(`logros/${this.idDocument}`);
    const date = moment(new Date());
    let subscriber: Subscription;
    this.videosDocument = this.afS.doc(`objetivos/${idDocument}`);
    subscriber = this.videosDocument.valueChanges().pipe(
      map(res => {
        console.log(res);
        let mStartDay = moment.unix(res.fecha_inicio.seconds);
        let mActualizado = moment.unix(res.actualizado.seconds);
        let mEndDay = moment.unix(res.fecha_termino.seconds);
        subscriber.unsubscribe();
        console.log('Fecha actualizado: ', mActualizado.toDate());
        console.log('Fecha hoy: ', date.toDate());
        console.log('Diferencia en horas: ', date.diff(mActualizado, 'hours'))
        if (date > mStartDay && (date.diff(mActualizado, 'hours') >= 24)) {
          let badge = {
            fecha: date.toDate(),
            titulo: res.titulo,
            porcentaje: null,
            mensaje: '',
            id_usuario: this.idDocument
          };
          res.dias_cumplidos = res.dias_cumplidos + 1;
          res.porcentaje = (res.dias_cumplidos * 100) / res.dias_a_cumplir;
          res.actualizado = date.toDate();
          if (res.porcentaje >= 50 && res.porcentaje < 80) {
            res.badge50 = true;
            console.log('Aqui debo entrar si es >= 50');
            badge.porcentaje = res.porcentaje;
            badge.mensaje = 'Has llegado a la mitad de tu objetivo';
            // this.setBadge(badge)
            //   .then(() => alert('Felicidades has ganado una medalla'))
            //   .catch(() => console.error('Eror al crear medalla 50'))
          } else if (res.porcentaje >= 100) {
            console.log('Aqui debo entrar si es >= 100');
            res.badge100 = true;
            res.estado = 'cumplido';
            badge.porcentaje = res.porcentaje;
            badge.mensaje = 'Concluiste con exito tu objetivo';
            // this.setBadge(badge)
            //   .then(() => alert('Felicidades has ganado una medalla'))
            //   .catch(() => console.error('Eror al crear medalla 100'))
          }
          this.videosDocument.update(res).then(() => {
            console.log('Actualizado con exito');
            if (res.porcentaje < 100) {
              alert('Estas un paso mas cerca de lograrlo')
            }
          })
            .catch(() => console.error('Error al actualizar'))
        } else if (date < mStartDay) {
          alert('El objetivo aun no comienza');
        } else if (date > mEndDay) {
          alert('El objetivo ha caducado')
        } else {
          alert('Ya se actualizo el dia de hoy');
        }
      })
    ).subscribe();
  }

  recordVideo(videoData) {
    this.videosCollection = this.afS.collection(`meditaciones_video`);
    return this.videosCollection.doc(`${videoData.id}`).set(
      {
        id_terapista: this.idDocument,
        id_video: videoData.id,
        descripcion: videoData.descripcion,
        titulo: videoData.titulo,
        tipo: 'video'
      }
    );
  }

  loadObjectives(idDocument) {
    this.videosCollection = this.afS.collection('objetivos', ref => {
      return ref.where('id_usuario', '==', idDocument)
        .where('estado', '==', 'no cumplido')
    });
    return this.videosCollection.snapshotChanges()
      .pipe(
        map((actions: DocumentChangeAction<any>[]) => {
          return actions.map((a: DocumentChangeAction<any>) => {
            const data: Object = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data};
          });
        }),
      );
  }

  loadBadges(idDocument) {
    this.videosCollection = this.afS.collection('objetivos', ref => {
      return ref.where('id_usuario', '==', idDocument)
    });
    return this.videosCollection.snapshotChanges()
      .pipe(
        map((actions: DocumentChangeAction<any>[]) => {
          return actions.map((a: DocumentChangeAction<any>) => {
            const data: Object = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data};
          });
        }),
      );
  }

  loadData(idDocument, collection) {
    this.videosCollection = this.afS.collection(collection, ref => {
      return ref
        .where('id_terapista', '==', idDocument)
    });
    return this.videosCollection.valueChanges()
  }

  loadDataPatient(idDocument, type) {
    this.videosCollection = this.afS.collection('recomendaciones', ref => {
      return ref
        .where('id_paciente', '==', idDocument)
        .where('tipo', '==', type)
    });
    return this.videosCollection.valueChanges()
  }

  removeVideo(id) {
    this.videosDocument = this.afS.doc(`meditaciones_video/${id}`);
    return this.videosDocument.delete();
  }

  shareVideo(patients: Array<any>, video) {
    patients.forEach(
      (x) => {
        video.id_paciente = x;
        this.videosCollection = this.afS.collection(`recomendaciones`)
        this.videosCollection.add(video)
      }
    )
  }

  async setBadge(badge) {
    this.logrosCollection = this.afS.collection('logros');
    return await this.logrosCollection.add(badge)
  }
}
