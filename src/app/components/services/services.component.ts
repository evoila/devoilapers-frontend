import { Router } from '@angular/router';
import {
  Component, OnDestroy,
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

import { Observable, Subscription, interval  } from 'rxjs';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  providers: [ ServiceService ]
})
export class ServicesComponent implements OnInit, OnDestroy {
  @ViewChild(ActionModalComponent) actionModal: ActionModalComponent;

  private updateSubscription: Subscription;

  services: Array<DtosServiceInstanceDetailsDto> = [];

  constructor(
    private serviceService: ServiceService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.updateServiceList();
    this.updateSubscription = interval(10000).subscribe(
      () => this.updateServiceList()
    );
  }

  updateServiceList(): void {
    this.serviceService.servicesInfoGet().subscribe({
      next: services => {this.services = services.services; },
    });
  }

  gotoServiceDetails(serviceType: string, serviceName: string): void {
    this.router.navigate(['main/services', serviceType, serviceName]);
  }

  displayAction(
    selectedService: DtosServiceInstanceDetailsDto,
    selectedAction: DtosServiceInstanceActionDto): void {

    this.actionModal.displayAction(selectedService, selectedAction);

  }

  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
  }
}
