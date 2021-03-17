import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RadioWidget } from 'ngx-schema-form';
@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent extends RadioWidget implements OnInit {
  fg: FormGroup = new FormGroup({});
  inputClass = '';

  ngOnInit(): void {
    // Work arround: https://github.com/guillotinaweb/ngx-schema-form/issues/75
    this.fg.addControl(this.name, this.control);

    if (this.formProperty.schema.inputClass)
      this.inputClass = this.formProperty.schema.inputClass;
    else
      this.inputClass = 'radio-inline';
  }
}
