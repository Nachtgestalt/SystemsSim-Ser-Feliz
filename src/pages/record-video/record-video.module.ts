import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecordVideoPage } from './record-video';

@NgModule({
  declarations: [
    RecordVideoPage,
  ],
  imports: [
    IonicPageModule.forChild(RecordVideoPage),
  ],
})
export class RecordVideoPageModule {}
