import {Component, ViewChild} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, Slides} from 'ionic-angular';
import {ExplorePage} from "../explore/explore";
import {OptionsPage} from "../options/options";
import {UserProvider} from "../../providers/user/user";
import {Subscription} from "rxjs/Rx";
import {EditProfilePage} from "../edit-profile/edit-profile";

@IonicPage()
@Component({
  selector: 'page-me',
  templateUrl: 'me.html',
})
export class MePage {
  @ViewChild(Slides) slides: Slides;
  currentSlideIndex: number = 0;
  user: any;
  subscription: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modalCtrl: ModalController,
              public _userProv: UserProvider) {
  }

  ionViewCanEnter() {
    console.log('ionViewCanEnter MePage');
    this._userProv.getUser().then(user => {
      this._userProv.getUser$(user)
        .subscribe(data => this.user = data[0],
          error1 => console.error(error1));
    });
    // this._userProv.loadStorage().then( existe => {
    //   if ( existe ) {
    //     console.log('Cargo el storage!');
    //   }
    // });

    // this.subscription = this._userProv.user$.subscribe(
    //   data => {
    //     this.user = data[0];
    //     console.log('Observable user' + JSON.stringify(data));
    //   },
    //   error1 => console.log(JSON.stringify(error1))
    // );
  }

  ionViewCanLeave() {
    // this.subscription.unsubscribe();
  }

  slideChanged() {
    this.currentSlideIndex = this.slides.getActiveIndex();
  }

  goToExplore() {
    this.navCtrl.push(ExplorePage, {}, {
      direction: 'forward'
    });
  }

  goToMenu() {
    this.navCtrl.pop({
      direction: 'forward'
    });
  }

  openProfileEdit() {
    this.navCtrl.push(EditProfilePage, {}, {
      direction: 'forward'
    })
  }

  openSettings() {
    let modal = this.modalCtrl.create(OptionsPage);
    modal.present();
  }

  // openTinderPlus() {
  //   let modal = this.modalCtrl.create(TinderPlusPage);
  //   modal.present();
  // }
}
