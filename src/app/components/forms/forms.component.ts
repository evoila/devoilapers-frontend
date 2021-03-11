// app.component.ts

import { Component } from "@angular/core";
import {CheckboxWidget} from 'ngx-schema-form';

@Component({
  selector: "minimal-app",
  // Bind the "mySchema" member to the schema input of the Form component.
  template: '<sf-form [schema]="mySchema"></sf-form> <input type="ButtonComponent">',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
  // The schema that will be used to generate a form
  mySchema = {
    "$schema": "http://json-schema.org/draft-04/hyper-schema#",
    "type": "object",
    "properties": {
      "title": {
        "type": "string",
        "title": "Title",
        "widget": {
          "id": "select"
        },
        "buttons": [
          {
            "id": "toggle_title",
            "label": "Toggle title disabled state"
          }
        ]
      },
    }
  }
}
