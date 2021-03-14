import {Injectable} from '@angular/core';
import {DefaultWidgetRegistry} from 'ngx-schema-form';
import {ButtonComponent} from './button/button.component';

@Injectable()
export class ClarityWidgetRegistry extends DefaultWidgetRegistry {
  constructor() {
    super();

    this.register("button", ButtonComponent);
  }
}
