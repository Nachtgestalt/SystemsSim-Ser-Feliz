import {Component} from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {FileChooser} from "@ionic-native/file-chooser";
import * as firebase from "firebase";
import {ChatProvider} from "../../providers/chat/chat";
import {RelaxProvProvider} from "../../providers/relax-prov/relax-prov";
import {UserProvider} from "../../providers/user/user";
import {FilePath} from "@ionic-native/file-path";
import {File} from "@ionic-native/file";
import {UploadFilesProvider} from "../../providers/upload-files/upload-files";
import {RecordAudioPage} from "../record-audio/record-audio";

/**
 * Generated class for the AudiosTherapistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-audios-therapist',
  templateUrl: 'audios-therapist.html',
})
export class AudiosTherapistPage {
  idDocument = '';
  typeUser = '';
  friends = [];
  audios = [];
  audioUrl = ''

  audio = new Audio();

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public _chatProv: ChatProvider,
              public _relaxProv: RelaxProvProvider,
              public _userProv: UserProvider) {
    this._userProv.getIdDocument().then((data: string) => {
      this.idDocument = data;
      this.loadAudios(data);
    });

    this._userProv.getTypeUser().then((data: string) => {
      this.typeUser = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AudiosTherapistPage');
  }

  recordAudio() {
    let modal = this.modalCtrl.create(RecordAudioPage);
    modal.present();
  }

  loadAudios(idDocument) {
    this._relaxProv.loadData(idDocument, 'meditaciones_audio').subscribe(
      audios => {
        this.audios = audios;
      }
    )
  }

  play(url) {
    this.audioUrl = url
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
        console.log('Aqui debe estar la info: ', res);
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

}
