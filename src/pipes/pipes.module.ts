import { NgModule } from '@angular/core';
import { HourMinutePipe } from './hour-minute/hour-minute';
import { YoutubePipe } from './youtube/youtube';
@NgModule({
	declarations: [HourMinutePipe,
    YoutubePipe],
	imports: [],
	exports: [HourMinutePipe,
    YoutubePipe]
})
export class PipesModule {}
