import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignUpContactPersonPage } from './sign-up-contact-person';

@NgModule({
  declarations: [
    SignUpContactPersonPage,
  ],
  imports: [
    IonicPageModule.forChild(SignUpContactPersonPage),
  ],
})
export class SignUpContactPersonPageModule {}
