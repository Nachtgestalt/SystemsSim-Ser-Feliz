import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecordObjectivePage } from './record-objective';

@NgModule({
  declarations: [
    RecordObjectivePage,
  ],
  imports: [
    IonicPageModule.forChild(RecordObjectivePage),
  ],
})
export class RecordObjectivePageModule {}
