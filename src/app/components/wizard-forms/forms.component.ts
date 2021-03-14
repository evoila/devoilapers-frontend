import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: "app-forms",
  // Bind the "mySchema" member to the schema input of the Form component.
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
  @Input() formJson: Object;
  @Output() resultJson = new EventEmitter<object>();

  emitResultJson(formResult) {
    this.resultJson.emit(formResult);
  }
}
