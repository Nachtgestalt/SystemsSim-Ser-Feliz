import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TypeOfUserPage } from './type-of-user';

@NgModule({
  declarations: [
    TypeOfUserPage,
  ],
  imports: [
    IonicPageModule.forChild(TypeOfUserPage),
  ],
})
export class TypeOfUserPageModule {}
