import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecordAudioPage } from './record-audio';

@NgModule({
  declarations: [
    RecordAudioPage,
  ],
  imports: [
    IonicPageModule.forChild(RecordAudioPage),
  ],
})
export class RecordAudioPageModule {}
