import {Component, ViewChild} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, Slides} from 'ionic-angular';
import {ExplorePage} from "../explore/explore";
import {MenuPage} from "../menu/menu";


@IonicPage()
@Component({
  selector: 'page-me',
  templateUrl: 'me.html',
})
export class MePage {
  @ViewChild(Slides) slides: Slides;
  currentSlideIndex: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MePage');
    // this.openProfileEdit();// TODO
  }

  slideChanged() {
    this.currentSlideIndex = this.slides.getActiveIndex();
  }

  goToExplore() {
    this.navCtrl.setRoot(ExplorePage, {}, {
      direction: 'forward'
    });
  }

  goToMenu() {
    this.navCtrl.push(MenuPage, {}, {
      direction: 'forward'
    });
  }

  // openProfile() {
  //   let modal = this.modalCtrl.create(ProfilePage);
  //   modal.present();
  // }

  // openProfileEdit() {
  //   let modal = this.modalCtrl.create(ProfileEditPage);
  //   modal.present();
  // }

  // openSettings() {
  //   let modal = this.modalCtrl.create(SettingsPage);
  //   modal.present();
  // }

  // openTinderPlus() {
  //   let modal = this.modalCtrl.create(TinderPlusPage);
  //   modal.present();
  // }
}
