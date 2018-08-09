import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignUpPersonalInformationPage } from './sign-up-personal-information';

@NgModule({
  declarations: [
    SignUpPersonalInformationPage,
  ],
  imports: [
    IonicPageModule.forChild(SignUpPersonalInformationPage),
  ],
})
export class SignUpPersonalInformationPageModule {}
