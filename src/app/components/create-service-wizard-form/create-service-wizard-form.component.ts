import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: "app-create-service-wizard-form",
  // Bind the "mySchema" member to the schema string of the Form component.
  templateUrl: './create-service-wizard-form.component.html',
  styleUrls: ['./create-service-wizard-form.component.scss']
})
export class CreateServiceWizardFormComponent {
  @Input() formJson: Object;
  @Output() resultJson = new EventEmitter<object>();



  emitResultJson(formResult) {
    this.resultJson.emit(formResult);
  }
}
