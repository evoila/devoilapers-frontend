import { Router } from '@angular/router';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  DtosServiceInstanceActionDto,
  DtosServiceInstanceDetailsDto,
  ServiceService
} from '../../share/swagger-auto-gen';
import * as ace from 'ace-builds';
import 'ace-builds/webpack-resolver';
import { ActionModalComponent } from '../action-modal/action-modal.component';
import { NotificationService } from '../../services/notification/notification.service';
import * as arraySort from 'array-sort';
import {Outlet} from '../../services/notification/outlet';
import {NotificationType} from '../../services/notification/notificationtype';
import {Notification} from '../../services/notification/notification';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss'],
})
export class ServiceDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('editor') private editor: ElementRef<HTMLElement>;
  @ViewChild( ActionModalComponent ) actionModal: ActionModalComponent;

  services: Array<DtosServiceInstanceDetailsDto> = [];
  aceEditor: any;
  selectedService: DtosServiceInstanceDetailsDto = {};

  mainModalWasOpen = false;
  _detailsModalIsOpen = false;
  _editorModalIsOpen = false;
  _deleteModalIsOpen = false;

  private notificationOutlet: string;

  set editorModalIsOpen(value: boolean) {
    // if (value) {
    //   this.notificationService.useOutletOnError(Outlet.editorModal);
    // }

    if (!value && value !== this._editorModalIsOpen){
      this.onModalClose();
    }

    this._editorModalIsOpen = value;
  }

  get editorModalIsOpen(): boolean {
    return this._editorModalIsOpen;
  }

  set deleteModalIsOpen(value: boolean) {
    // if (value) {
    //   this.notificationService.useOutletOnError(Outlet.deleteModal);
    // }

    if (!value && value !== this._deleteModalIsOpen)
      this.onModalClose();

    this._deleteModalIsOpen = value;
  }

  get deleteModalIsOpen(): boolean {
    return this._deleteModalIsOpen;
  }

  set detailsModalIsOpen(value: boolean) {
    // if (value) {
    //   this.notificationService.useOutlet(Outlet.detailsModal);
    // }

    if (!value && this._detailsModalIsOpen !== value && !this.mainModalWasOpen) {
      this.router.navigate(['main/services']).then();
    }

    this._detailsModalIsOpen = value;
  }

  get detailsModalIsOpen(): boolean {
    return this._detailsModalIsOpen;
  }

  onModalClose(): void {
    this.updateServiceList();
    if (this.mainModalWasOpen) {
      this.mainModalWasOpen = false;
      this.notificationService.useOutletOnSuccess(Outlet.detailsModal);
      this.showServiceDetailsModal();
    }

  }


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private serviceService: ServiceService,
    private notificationService: NotificationService,
    private cdRef: ChangeDetectorRef,
  ) {
    this.useGlobalNotification();
  }

  ngOnInit(): void {
    this.notificationService.useOutlet(Outlet.global);
    this.subscribeToNotificationOutlet();

    this.updateServiceList();
    // this.updateSubscription = interval(10000).subscribe(
    //   () => this.updateServiceList()
    // );
    this.subscribeToServiceInfo();
  }

  subscribeToServiceInfo(): void {
    this.route.params.subscribe((params) => {
      if (params !== {} && params.serviceType !== undefined
        && params.serivceName !== undefined) {
        this.serviceService
          .servicesInfoServicetypeServicenameGet(params.serviceType, params.serivceName)
          .subscribe({
            next: (services) => {
              this.setSelectedService(services.services[0]);
              this.closeAllModals();
              this.detailsModalIsOpen = true;
            },
          });
      }
    });
  }

  updateSelectedService(): void {
    this.route.params.subscribe((params) => {
      if (params !== {} && params.serviceType !== undefined
        && params.serivceName !== undefined) {
        this.serviceService
          .servicesInfoServicetypeServicenameGet(params.serviceType, params.serivceName)
          .subscribe({
            next: (services) => {
              this.setSelectedService(services.services[0]);
            },
          });
      }
    });
  }

  subscribeToNotificationOutlet(): void {
    this.notificationService.currentNotificationOutlet.subscribe(
      notificationOutlet => {
        this.notificationOutlet = notificationOutlet;
        this.cdRef.detectChanges();
      }
    );
  }

  notificationIsOpen(outlet: string): boolean {
    return this.notificationOutlet === outlet;
  }

  useGlobalNotification(): void {
    this.notificationService.useOutletOnSuccess(Outlet.global);
  }

  updateServiceList(): void {
    this.serviceService.servicesInfoGet().subscribe({
      next: services => {
        this.services = arraySort(services.services, ['type', 'name']);
      },
    });
  }

  ngAfterViewInit(): void {
    ace.config.set('fontSize', '14px');
    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditor.session.setMode('ace/mode/yaml');
    this.aceEditor.setReadOnly(true);
  }

  redirectToService(service: DtosServiceInstanceDetailsDto): void {
    this.router.navigate(['main/services', service.type, service.name]).then();
  }

  closeNotification(): void {
    this.notificationService.close();
  }

  closeAllModals(): void {
    if (this.detailsModalIsOpen)
      this.mainModalWasOpen = true;

    this.detailsModalIsOpen = false;
    this.deleteModalIsOpen = false;
    this.editorModalIsOpen = false;
  }

  deleteService(): void {
    const closure = this.selectedService;
    this.serviceService.servicesServicetypeServicenameDelete(
      closure.type,
      closure.name).subscribe({
        next: () => {
          this.mainModalWasOpen = false;
          this.notificationService.useOutletOnSuccess(Outlet.global);
          this.notificationService.addSuccess(
            new Notification(
              NotificationType.Info,
              closure.name + ': Service deleted.',
              ' Type: ' + closure.type +
              ' Service Name: ' + closure.name +
              ': Service successful deleted.',
            ));
          this.deleteModalIsOpen = false;
          this.updateServiceList();
          this.router.navigate(['main/services']).then();
        },
      });
  }

  setSelectedService(service: DtosServiceInstanceDetailsDto): void {
    this.selectedService = service;
  }

  showDeleteModal(): void {
    this.notificationService.close();
    this.closeAllModals();
    this.deleteModalIsOpen = true;
  }

  showActionModal(selectedAction: DtosServiceInstanceActionDto): void {
    this.notificationService.close();
    this.closeAllModals();

    if (this.mainModalWasOpen){
      this.notificationService.useOutletOnSuccess(Outlet.detailsModal);
    } else {
      this.notificationService.useOutletOnSuccess(Outlet.global);
    }

    this.actionModal.displayAction(this.selectedService, selectedAction);
  }

  showServiceDetailsModal(): void {
    this.closeAllModals();
    this.updateSelectedService();
    this.redirectToService(this.selectedService);
    this.detailsModalIsOpen = true;
  }

  showYamlEditorModal(): void {
    this.notificationService.close();
    this.closeAllModals();
    this.editorModalIsOpen = true;

    this.serviceService.servicesYamlServicetypeServicenameGet(
      this.selectedService.type, this.selectedService.name).subscribe({
        next: (dtosServiceYamlDto) => {
          this.aceEditor.session.setValue(dtosServiceYamlDto.yaml);
        },
      });
  }
}
