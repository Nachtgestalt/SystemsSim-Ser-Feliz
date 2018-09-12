import { Component } from '@angular/core';
import {
  AlertController,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  Platform,
  ToastController
} from 'ionic-angular';
import {OptionsPage} from "../options/options";
import {RecordVideoPage} from "../record-video/record-video";
import {RelaxProvProvider} from "../../providers/relax-prov/relax-prov";
import {ChatProvider} from "../../providers/chat/chat";
import {Storage} from "@ionic/storage";
import {UserProvider} from "../../providers/user/user";

/**
 * Generated class for the VideosTherapistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-videos-therapist',
  templateUrl: 'videos-therapist.html',
})
export class VideosTherapistPage {

  videos = [];
  videoUrl = '';
  idDocument;
  typeUser;
  user;
  friends = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              private toast: ToastController,
              private storage: Storage,
              private platform: Platform,
              public _relaxProv: RelaxProvProvider,
              public _chatProv: ChatProvider,
              public _userProv: UserProvider) {
    this._userProv.getIdDocument().then(
      (data: string) => {
        this.idDocument = data;
        this.loadVideos(data);
      }
    );
    this.loadStorage().then();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideosTherapistPage');
  }

  showVideo(id) {
    this.videoUrl = id;
  }

  recordVideo() {
    let modal = this.modalCtrl.create(RecordVideoPage);
    modal.present();
  }

  deleteVideo(id_video) {
    this._relaxProv.removeVideo(id_video)
      .then(
        () => this.presentToast('Video eliminado')
      )
      .catch(
        () => this.presentToast('Error al eliminar video, intentalo más tarde')
      )
  }

  showPatients(video) {
    let resultado
    let alert = this.alertCtrl.create();
    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Compartir',
      handler: data => {
        console.log('Checkbox data:', data);
        this._relaxProv.shareVideo(data, video)
      }
    });
    alert.setTitle('¿Con que pacientes quieres compartir este video?');
    this._chatProv.getFriends(this.typeUser, this.idDocument).subscribe(
      res => {
        this.friends = [];
        console.log('Aqui debe estar la info: ',res);
        this.friends.push(res);
        this.friends.forEach(
          (x) => {
            alert.addInput({
              type: 'checkbox',
              label: `${x.nombre} ${x.apellidos}`,
              value: `${x.id}`,
            });
          }
        );
        alert.present();
      }
    );
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

  loadVideos(idDocument) {
    this._relaxProv.loadData(idDocument, 'meditaciones_video').subscribe(
      videos => {
        this.videos = videos;
      }
    )
  }

  loadStorage() {
    return new Promise( resolve => {
      if (this.platform.is('cordova')) {
        this.storage.get('idDocument').then(val => {
          if (val) {
            this.idDocument = val;
          }
        });
        this.storage.get('user')
          .then(
            val => {
              if (val) {
                this.user = val;
              }
            }
          );
        this.storage.get('typeUser').then(val => {
          if (val) {
            this.typeUser = val;
          }
        });
        resolve();
      } else {
        this.idDocument = localStorage.getItem('idDocument');
        this.typeUser = localStorage.getItem('typeUser');
        this.user = JSON.parse(localStorage.getItem('user'));
        resolve();
      }
    });

  }
}
