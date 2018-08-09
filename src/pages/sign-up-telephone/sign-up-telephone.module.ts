import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignUpTelephonePage } from './sign-up-telephone';

@NgModule({
  declarations: [
    SignUpTelephonePage,
  ],
  imports: [
    IonicPageModule.forChild(SignUpTelephonePage),
  ],
})
export class SignUpTelephonePageModule {}
