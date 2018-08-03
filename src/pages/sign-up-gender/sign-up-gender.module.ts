import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignUpGenderPage } from './sign-up-gender';

@NgModule({
  declarations: [
    SignUpGenderPage,
  ],
  imports: [
    IonicPageModule.forChild(SignUpGenderPage),
  ],
})
export class SignUpGenderPageModule {}
