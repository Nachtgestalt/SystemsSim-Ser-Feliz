import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListOfRequestPage } from './list-of-request';

@NgModule({
  declarations: [
    ListOfRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(ListOfRequestPage),
  ],
})
export class ListOfRequestPageModule {}
