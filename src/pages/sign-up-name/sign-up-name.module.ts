import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignUpNamePage } from './sign-up-name';

@NgModule({
  declarations: [
    SignUpNamePage,
  ],
  imports: [
    IonicPageModule.forChild(SignUpNamePage),
  ],
})
export class SignUpNamePageModule {}
