import { NgModule } from '@angular/core';
import { KeyboardAttachDirective } from './keyboard-attach/keyboard-attach';
import { ScrollableDirective } from './scrollable/scrollable';

@NgModule({
	declarations: [KeyboardAttachDirective,
    ScrollableDirective],
	imports: [],
	exports: [
	  KeyboardAttachDirective,
    ScrollableDirective
  ]
})
export class DirectivesModule {}
