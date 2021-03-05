import { Router } from '@angular/router';
import {
  Component,
  OnInit, ViewChild
} from '@angular/core';

import {
  ServiceService,
  DtosServiceInstanceDetailsDto,
  DtosServiceInstanceActionDto
} from 'src/app/share/swagger-auto-gen';

import {
  ActionModalComponent
} from '../action-modal/action-modal.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  providers: [ServiceService]
})
export class ServicesComponent implements OnInit {
  @ViewChild(ActionModalComponent) actionModal: ActionModalComponent;

  services: Array<DtosServiceInstanceDetailsDto> = [];

  constructor(
    private serviceService: ServiceService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.serviceService.servicesInfoGet().subscribe({
      next: services => {this.services = services.services; },
    });
    console.log(this.services.length)
  }

  gotoServiceDetails(serviceType: string, serviceName: string): void {
    this.router.navigate(['main/service-details', serviceType, serviceName]);
  }

  displayAction(
    selectedService: DtosServiceInstanceDetailsDto,
    selectedAction: DtosServiceInstanceActionDto): void {

    this.actionModal.displayAction(selectedService, selectedAction);

  }
}
