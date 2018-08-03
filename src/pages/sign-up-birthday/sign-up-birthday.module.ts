import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignUpBirthdayPage } from './sign-up-birthday';

@NgModule({
  declarations: [
    SignUpBirthdayPage,
  ],
  imports: [
    IonicPageModule.forChild(SignUpBirthdayPage),
  ],
})
export class SignUpBirthdayPageModule {}
