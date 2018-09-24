import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {RecordObjectivePage} from "../record-objective/record-objective";
import {UserProvider} from "../../providers/user/user";
import {RelaxProvProvider} from "../../providers/relax-prov/relax-prov";
import {LocalNotifications} from "@ionic-native/local-notifications";

@IonicPage()
@Component({
  selector: 'page-objectives',
  templateUrl: 'objectives.html',
})
export class ObjectivesPage {
  idDocument = '';
  objectives = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modalCtrl: ModalController,
              public _userProv: UserProvider,
              public _relaxProv: RelaxProvProvider,
              public localNotifications: LocalNotifications) {
    this._userProv.getIdDocument().then(
      (data: string) => {
        this.idDocument = data;
        console.log('Id Document: ', this.idDocument);
        this._relaxProv.loadObjectives(this.idDocument).subscribe(
          res => {
            console.log(res);
            this.objectives = res;
          }
        )
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ObjectivesPage');
  }

  newObjective() {
    let modal = this.modalCtrl.create(RecordObjectivePage);
    modal.present();
  }

  updateObjective(objective) {
    this._relaxProv.testUpdateObjective(objective.id)
  }

  removeNotifications() {
    this.localNotifications.clearAll();

  }

}
