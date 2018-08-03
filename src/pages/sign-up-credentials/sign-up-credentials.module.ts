import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignUpCredentialsPage } from './sign-up-credentials';

@NgModule({
  declarations: [
    SignUpCredentialsPage,
  ],
  imports: [
    IonicPageModule.forChild(SignUpCredentialsPage),
  ],
})
export class SignUpCredentialsPageModule {}
