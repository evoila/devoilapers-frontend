import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: "app-create-service-wizard",
  // Bind the "mySchema" member to the schema string of the Form component.
  templateUrl: './create-service-wizard.component.html',
  styleUrls: ['./create-service-wizard.component.scss']
})
export class CreateServiceWizardComponent {
  @Input() formJson: Object;
  @Output() resultJson = new EventEmitter<object>();



  emitResultJson(formResult) {
    this.resultJson.emit(formResult);
  }
}
