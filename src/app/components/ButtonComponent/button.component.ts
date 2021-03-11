import { Component, OnInit } from '@angular/core';
import {ButtonWidget, CheckboxWidget} from 'ngx-schema-form';
import { CdsButton } from '@clr/core/button';

@Component({
  selector: 'ButtonComponent',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent extends ButtonWidget {

}
