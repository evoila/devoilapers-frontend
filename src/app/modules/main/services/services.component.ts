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
  openModal: boolean = false;
  
  constructor(
    private serviceService: ServiceService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.serviceService.servicesInfoGet().subscribe({
      next: services => {this.services = services.services},
      error: msg => {console.log(msg)}
    });
  }

  gotoServiceDetails(serviceId: string){
    this.router.navigate(['main/service-details', serviceId]);
  }

  displayAction(selectedService: DtosServiceInstanceDetailsDto, selectedAction: DtosServiceInstanceActionDto){
    this.selectedService = selectedService;
    this.selectedAction = selectedAction;
  }

  executeAction(){
    this.serviceService.servicesActionServiceidActioncommandPost(this.selectedService.id, this.selectedAction.command).subscribe({
      next: () => {this.openModal = false},
      error: msg => {console.log(msg)}
    });
  }
}
