import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrackingChartsPage } from './tracking-charts';

@NgModule({
  declarations: [
    TrackingChartsPage,
  ],
  imports: [
    IonicPageModule.forChild(TrackingChartsPage),
  ],
})
export class TrackingChartsPageModule {}
