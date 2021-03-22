import {Injectable} from '@angular/core';
import { DefaultWidgetRegistry } from 'ngx-schema-form';
import { ButtonComponent } from './button/button.component';
import { StingComponent } from './string/sting.component';
import {SelectComponent} from './select/select.component';
import {ObjectLayoutComponent} from './object-layout/object-layout.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { RadioComponent } from './radio/radio.component';
import { FileComponent } from './file/file.component';

@Injectable()
export class ClarityWidgetRegistry extends DefaultWidgetRegistry {
  constructor() {
    super();

    this.register('button', ButtonComponent);
    this.register('string' , StingComponent);
    this.register('select', SelectComponent);
    this.register('boolean', CheckboxComponent);
    this.register('checkbox', CheckboxComponent);
    this.register('radio', RadioComponent);
    this.register('object', ObjectLayoutComponent);
    this.register('file', FileComponent);
  }
}
