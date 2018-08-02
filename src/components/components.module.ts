import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { DemoAvatarComponent } from './demo-avatar/demo-avatar';

@NgModule({
	declarations: [
    DemoAvatarComponent
	],
	imports: [
		IonicModule
	],
	entryComponents: [
		DemoAvatarComponent
	],
	exports: [
    DemoAvatarComponent
	]
})
export class ComponentsModule {}
