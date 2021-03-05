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

    console.log(this.selectedAction.placeholder);
    if (this.selectedAction.placeholder !== 'null'){

      this.selectedPlaceholder = JSON.parse(this.selectedAction.placeholder);
      this.selectedPlaceholderKeys = Object.keys(this.selectedPlaceholder);

      let keyCount;
      for (keyCount = 0; keyCount < this.selectedPlaceholderKeys.length; keyCount++) {

        let keyName = this.selectedPlaceholderKeys[keyCount];
        let valueType = (typeof this.selectedPlaceholder[keyName]);
        this.selectedPlaceholderTypes[keyName] = valueType;

      }
  }
    this.openModal = true;
  }

  executeAction(): void{
    let updatePlaceholder = null;
    if (this.selectedPlaceholderKeys.length !== 0){
      updatePlaceholder = JSON.stringify(this.selectedPlaceholder);
    }
    this.serviceService.servicesActionServicetypeServicenameActioncommandPost(
      updatePlaceholder,
      this.selectedService.type,
      this.selectedService.name,
      this.selectedAction.command).subscribe({
      next: () => {this.closeAction();},
      error: msg => {console.log(msg); }
    });
  }

  closeAction(): void  {
    this.openModal = false;
  }

  isString(key: string): boolean {
    return (this.selectedPlaceholderTypes[key]) === 'string';
  }

  isInteger(key: string): boolean {
    return (this.selectedPlaceholderTypes[key]) === 'number';
  }

  isBool(key: string): boolean {
    return (this.selectedPlaceholderTypes[key]) === 'boolean';
  }
}
