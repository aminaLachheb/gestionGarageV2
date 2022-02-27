import { AfterViewInit, Component , OnInit} from '@angular/core';
import { EventService } from './core/services/event.service';
//'../core/services/event.service';

import {
  LAYOUT_VERTICAL, LAYOUT_HORIZONTAL
}from './layouts/layouts.model'
//} from './layouts.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit /*, AfterViewInit*/ {

  // layout related config
  layoutType: string;

  constructor(private eventService: EventService) { }

  ngOnInit() {
  /*  // default settings
    this.layoutType = LAYOUT_VERTICAL;
    // listen to event and change the layout, theme, etc
    this.eventService.subscribe('changeLayout', (layout) => {
      this.layoutType = layout;
    });*/
  }

  /*ngAfterViewInit() {
  }*/

  /**
   * Check if the vertical layout is requested
   */
 /* isVerticalLayoutRequested() {
    return this.layoutType === LAYOUT_VERTICAL;
  }*/

  /**
   * Check if the horizontal layout is requested
   */
 /* isHorizontalLayoutRequested() {
    return this.layoutType === LAYOUT_HORIZONTAL;
  }*/
}