import { NgModule } from '@angular/core';
import { HourMinutePipe } from './hour-minute/hour-minute';
import { YoutubePipe } from './youtube/youtube';
import { TimestampDatePipe } from './timestamp-date/timestamp-date';
@NgModule({
	declarations: [HourMinutePipe,
    YoutubePipe,
    TimestampDatePipe],
	imports: [],
	exports: [HourMinutePipe,
    YoutubePipe,
    TimestampDatePipe]
})
export class PipesModule {}
