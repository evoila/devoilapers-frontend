import {
  AfterViewInit,
  Component,
  ElementRef, OnDestroy,
  OnInit, QueryList,
  ViewChild
} from '@angular/core';
import {
  ServicestoreService,
  DtosServiceStoreItemDto,
  ServiceService,
  DtosServiceYamlDto, DtosServiceStoreItemFormDto,
} from 'src/app/share/swagger-auto-gen';

import {NotificationService} from '../../services/notification/notification.service';
import * as arraySort from 'array-sort'
import {Outlet} from '../../services/notification/outlet';
import {NotificationType} from '../../services/notification/notificationtype';
import {Notification} from '../../services/notification/notification';
import { CreateServiceWizardComponent } from '../create-service-wizard/create-service-wizard.component';


@Component({
  selector: 'app-servicestore',
  templateUrl: './servicestore.component.html',
  styleUrls: ['./servicestore.component.scss'],
  providers: [ServicestoreService, ServiceService]
})
export class ServicestoreComponent implements OnInit, OnDestroy {  
  @ViewChild('creationWizard') wizard: CreateServiceWizardComponent;

  services: Array<DtosServiceStoreItemDto>;
  jsonFormPageNavTitles: string[];
  jsonForm: any;
  serviceType: string;
  clicked: boolean;
  private notificationOutlet: string;

  constructor(private servicestoreService: ServicestoreService,
              private serviceService: ServiceService,
              private notificationService: NotificationService,
  ) { }


  ngOnInit(): void {
    this.notificationService.close();
    this.notificationService.useOutlet(Outlet.global);
    this.subscribeToNotificationOutlet();

    this.servicestoreService.servicestoreInfoGet().subscribe({
      next: services => {
        this.services = arraySort(services.services, ['type']);

       },
    });

  }

  subscribeToNotificationOutlet(): void{
    this.notificationService.currentNotificationOutlet.subscribe(
      notificationOutlet => this.notificationOutlet = notificationOutlet
    )
  }

  notificationIsOpen(outlet: string): boolean {
    return this.notificationOutlet === outlet;
  }

  useGlobalNotificationSuccess(): void {
    this.notificationService.useOutletOnSuccess(Outlet.global);
  }

  useEditorModalNotificationSuccess(): void {
    this.notificationService.useOutletOnSuccess(Outlet.global);
  }

  open(service: DtosServiceStoreItemDto): void{
    this.notificationService.close();
    this.notificationService.useOutletOnSuccess(Outlet.global);
    this.notificationService.useOutletOnError(Outlet.editorModal);

    this.serviceType = service.type;
    this.wizard.open(service)
  }

  finish(yaml: string): void {
    this.clicked = true;

    const dtosServiceYamlDto = {
      yaml
    } as DtosServiceYamlDto;

    this.serviceService.servicesCreateServicetypePost(dtosServiceYamlDto, this.serviceType).subscribe({
        next: () => {
          this.useGlobalNotificationSuccess();
          this.notificationService.addSuccess(
            new Notification(
              NotificationType.Info,
              this.serviceType + ': Action successful executed.',
              'YAML:' + dtosServiceYamlDto.yaml,
            )
          );
        }
      });
  }

  ngOnDestroy(): void {
    this.notificationService.close();
  }
}
