import { Component } from '@angular/core';
import {DtosServiceInstanceActionDto, DtosServiceInstanceDetailsDto, ServiceService} from '../../share/swagger-auto-gen';

@Component({
  selector: 'app-action-modal',
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.scss']
})
export class ActionModalComponent {

  selectedService: DtosServiceInstanceDetailsDto = {};
  selectedAction: DtosServiceInstanceActionDto = {};

  openModal = false;
  selectedPlaceholder: any;
  selectedPlaceholderKeys: any;
  selectedPlaceholderTypes =  {} ;

  constructor(
    private serviceService: ServiceService,
  ) { }

  displayAction(
    selectedService: DtosServiceInstanceDetailsDto,
    selectedAction: DtosServiceInstanceActionDto): void {

    this.selectedService = selectedService;
    this.selectedAction = selectedAction;

    this.selectedPlaceholder = JSON.parse(this.selectedAction.placeholder);
    this.selectedPlaceholderKeys = Object.keys(this.selectedPlaceholder);

    var keyCount;
    for (keyCount = 0; keyCount < this.selectedPlaceholderKeys.length; keyCount++) {

      var keyName = this.selectedPlaceholderKeys[keyCount];
      var valueType = (typeof this.selectedPlaceholder[keyName]);
      this.selectedPlaceholderTypes[keyName] = valueType;

    }

    this.openModal = true;
  }

  executeAction(): void{
    this.serviceService.servicesActionServicetypeServicenameActioncommandPost(
      JSON.stringify(this.selectedPlaceholder),
      this.selectedService.type,
      this.selectedService.name,
      this.selectedAction.command).subscribe({
      next: () => {this.closeAction()},
      error: msg => {console.log(msg); }
    });
  }

  closeAction(): void  {
    this.openModal = false;
  }

  isString(key: string) {
    return (this.selectedPlaceholderTypes[key]) === 'string';
  }

  isInteger(key: string) {
    return (this.selectedPlaceholderTypes[key]) === 'number';
  }

  isBool(key: string) {
    return (this.selectedPlaceholderTypes[key]) === 'boolean';
  }
}
