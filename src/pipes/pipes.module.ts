import { NgModule } from '@angular/core';
import { HourMinutePipe } from './hour-minute/hour-minute';
@NgModule({
	declarations: [HourMinutePipe],
	imports: [],
	exports: [HourMinutePipe]
})
export class PipesModule {}
