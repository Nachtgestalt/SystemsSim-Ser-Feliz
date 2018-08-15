import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {UploadFilesProvider} from "../../providers/upload-files/upload-files";

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  imagePreview: string = '';
  image64: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private camera: Camera,
              private imagePicker: ImagePicker,
              public _loadFileProvider: UploadFilesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  mostrarCamara() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.imagePreview = 'data:image/jpeg;base64,' + imageData;
      this.image64 = imageData;
      // this.imagePreview = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      console.log('Error en camara', JSON.stringify(err));
    });
  }

  seleccionarFoto() {
    let options: ImagePickerOptions = {
      quality: 70,
      outputType: 1,
      maximumImagesCount: 1
    };

    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        // console.log('Image URI: ' + results[i]);
        this.imagePreview = 'data:image/jpeg;base64,' + results[i];
        this.image64 = results[i];
      }
    }, (err) => {
      console.log('Error en seleccionar imagen', JSON.stringify(err))
    });
  }

  editImageProfile() {
    let file = {
      img: this.image64
    };

    this._loadFileProvider.uploadImageToFirebase(file).then( () => this.navCtrl.pop())
  }

}
