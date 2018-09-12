import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {RelaxProvProvider} from "../../providers/relax-prov/relax-prov";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FilePath} from "@ionic-native/file-path";
import {File} from "@ionic-native/file";
import {FileChooser} from "@ionic-native/file-chooser";
import {UploadFilesProvider} from "../../providers/upload-files/upload-files";
import {UserProvider} from "../../providers/user/user";

/**
 * Generated class for the RecordAudioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-record-audio',
  templateUrl: 'record-audio.html',
})
export class RecordAudioPage {
  idDocument = '';
  form: FormGroup;
  dirPath;
  fileName;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController,
              private fileChooser: FileChooser,
              private file: File,
              private filePath: FilePath,
              private toast: ToastController,
              public _relaxProv: RelaxProvProvider,
              public _uploadFilesProv: UploadFilesProvider,
              public _userProv: UserProvider) {
    this._userProv.getIdDocument().then((idDoc: string) => {
      this.idDocument = idDoc;
    });

    this.createFormGroup();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecordAudioPage');
  }

  createFormGroup() {
    this.form = new FormGroup({
      'archivo': new FormControl(null, Validators.required),
      'titulo': new FormControl('', Validators.required),
      'descripcion': new FormControl('', Validators.required),
    })
  }

  recordAudio() {
    const data = {
      titulo: this.form.get('titulo').value,
      descripcion: this.form.get('descripcion').value,
      id_terapista: this.idDocument,
      nombre_archivo: this.fileName,
      tipo: 'audio'
    };
    this.file.readAsArrayBuffer(this.dirPath, this.fileName).then(async (buffer) => {
      try {
        await this._uploadFilesProv.uploadAudioToFirebase(buffer, this.fileName, data);
        this.dismiss();
      } catch (e) {
        console.log(e);
      }
    })
  }

  dismiss(data?) {
    this.viewCtrl.dismiss();
  }

  chooseAudio() {
    this.fileChooser.open().then((uri) => {
      this.filePath.resolveNativePath(uri).then((filePath) => {
        let dirPathSegments = filePath.split('/');
        this.fileName = dirPathSegments[dirPathSegments.length - 1];
        dirPathSegments.pop();
        this.dirPath = dirPathSegments.join('/');
        this.form.get('archivo').setValue(this.fileName);
      })
    });
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
