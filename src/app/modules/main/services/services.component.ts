import { Router } from '@angular/router';
import {
  Component,
  OnInit
} from '@angular/core';

import {
  ServiceService,
  DtosServiceInstanceDetailsDto,
  DtosServiceInstanceActionDto
} from 'src/app/rest';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  providers: [ServiceService]
})
export class ServicesComponent implements OnInit {
  services: Array<DtosServiceInstanceDetailsDto> = [];

  selectedService: DtosServiceInstanceDetailsDto = {};
  selectedAction: DtosServiceInstanceActionDto = {};
  selectedPayload: string;

  openModal = false;

  constructor(
    private serviceService: ServiceService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.serviceService.servicesInfoGet().subscribe({
      next: services => {this.services = services.services; },
      error: msg => {console.log(msg); }
    });
  }

  gotoServiceDetails(serviceType: string, serviceName: string): void {
    this.router.navigate(['main/service-details', serviceType, serviceName]);
  }

  displayAction(
    selectedService: DtosServiceInstanceDetailsDto,
    selectedAction: DtosServiceInstanceActionDto): void {
    this.selectedService = selectedService;
    this.selectedAction = selectedAction;
  }

  executeAction(): void{
    this.serviceService.servicesActionServicetypeServicenameActioncommandPost(
      this.selectedPayload,
      this.selectedService.type,
      this.selectedService.name,
      this.selectedAction.command).subscribe({
      next: () => {this.openModal = false; },
      error: msg => {console.log(msg); }
    });
  }
}
