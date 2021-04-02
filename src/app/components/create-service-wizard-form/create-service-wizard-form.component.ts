import {Component, EventEmitter, Input, Output} from '@angular/core';


@Component({
  selector: 'app-create-service-wizard-form',
  // Bind the "mySchema" member to the schema string of the Form component.
  templateUrl: './create-service-wizard-form.component.html',
  styleUrls: ['./create-service-wizard-form.component.scss']
})
export class CreateServiceWizardFormComponent {
  // tslint:disable-next-line:ban-types
  @Input() formJson: Object;
  @Output() resultJson = new EventEmitter<object>();



  // tslint:disable-next-line:typedef
  emitResultJson(formResult): void {
    this.resultJson.emit(formResult);
  }
}
