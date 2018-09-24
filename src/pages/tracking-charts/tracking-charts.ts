import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {TrackingProvider} from "../../providers/tracking/tracking";
import {Subscription} from "rxjs/Rx";
import {BaseChartDirective} from "ng2-charts";
import {map} from "rxjs/operators";
import {UserProvider} from "../../providers/user/user";

@IonicPage()
@Component({
  selector: 'page-tracking-charts',
  templateUrl: 'tracking-charts.html',
})

export class TrackingChartsPage {
  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;
  data$: Subscription;
  isDataAvailable = false;


  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  estupendo = {
    data: [],
    label: 'Estupendo'
  };

  muyBien = {
    data: [],
    label: 'Muy bien'
  };

  bien = {
    data: [],
    label: 'Bien'
  };

  regular = {
    data: [],
    label: 'Regular'
  };

  noBien = {
    data: [],
    label: 'No bien'
  };

  mal = {
    data: [],
    label: 'Mal'
  };

  desastroso = {
    data: [],
    label: 'Desastroso'
  };

  public barChartLabels: string[] = [];
  public barChartData: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public _trackingProv: TrackingProvider,
              public _userProv: UserProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackingChartsPage');
    this._userProv.getIdDocument().then( idDocument => {
      this.data$ = this._trackingProv.getTrackingData(idDocument)
        .subscribe(
          (res: any) => {
            this.isDataAvailable = false;
            this.barChartData = [];
            this.barChartLabels = [];
            this.estupendo = {
              data: [],
              label: 'Estupendo'
            };

            this.muyBien = {
              data: [],
              label: 'Muy bien'
            };

            this.bien = {
              data: [],
              label: 'Bien'
            };

            this.regular = {
              data: [],
              label: 'Regular'
            };

            this.noBien = {
              data: [],
              label: 'No bien'
            };

            this.mal = {
              data: [],
              label: 'Mal'
            };

            this.desastroso = {
              data: [],
              label: 'Desastroso'
            };

            console.log(res);
            for (let seguimiento of res) {
              this.estupendo.data.push(seguimiento.Estupendo);
              this.muyBien.data.push(seguimiento['Muy bien']);
              this.bien.data.push(seguimiento['Bien']);
              this.regular.data.push(seguimiento.Regular);
              this.noBien.data.push(seguimiento['No bien']);
              this.mal.data.push(seguimiento['Mal']);
              this.desastroso.data.push(seguimiento['Desastroso']);
              this.barChartLabels.push(seguimiento.fecha);
            }
            setTimeout( () =>{
              this.barChartData.push(this.estupendo);
              this.barChartData.push(this.muyBien);
              this.barChartData.push(this.bien);
              this.barChartData.push(this.regular);
              this.barChartData.push(this.noBien);
              this.barChartData.push(this.mal);
              this.barChartData.push(this.desastroso);
              console.log('Barchar Data: ', this.barChartData);
              console.log('Barchar Labels: ', this.barChartLabels);
              this.isDataAvailable = true;
            }, 200)
          },
          error1 => {
            console.log('Error', error1)
          },
          () => {
          }
        );

      }
    );

  }

  ionViewCanEnter() {
  }

  ionViewCanLeave() {
    console.log('Estoy en CanLeave Trackingcharts')
    this.data$.unsubscribe();
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public randomize(): void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      49,
      50,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }

}
