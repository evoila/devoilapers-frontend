import { Router } from '@angular/router';
import {
  AfterViewInit,
  Component,
  ElementRef, OnDestroy,
  OnInit,
  ViewChild,
  Input,
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
import { Notification, NotificationService, NotificationType } from '../../services/notification/notification.service';
import { interval, Subscription } from 'rxjs';
import * as arraySort from 'array-sort'
import {findAll} from '@angular/compiler-cli/ngcc/src/utils';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss'],
})
export class ServiceDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('editor') private editor: ElementRef<HTMLElement>;
  @ViewChild(ActionModalComponent) actionModal: ActionModalComponent;

  // private updateSubscription: Subscription;

  services: Array<DtosServiceInstanceDetailsDto> = [];
  aceEditor: any;
  selectedService: DtosServiceInstanceDetailsDto = {};

  mainModalWasOpen = false;
  _detailsModalIsOpen = false;
  _editorModalIsOpen = false;
  _deleteModalIsOpen = false;

  notificationsIsOpen = false;

  notificationIsOpen = false;
  notification: Notification | null = null;

  set editorModalIsOpen(value: boolean) {
    if (!value && value != this._editorModalIsOpen)
      this.onModalClose()

    this._editorModalIsOpen = value;
  }

  get editorModalIsOpen() {
    return this._editorModalIsOpen;
  }

  set deleteModalIsOpen(value: boolean) {
    if (!value && value != this._deleteModalIsOpen)
      this.onModalClose()

    this._deleteModalIsOpen = value;
  }

  get deleteModalIsOpen() {
    return this._deleteModalIsOpen;
  }

  set detailsModalIsOpen(value: boolean) {
    if (!value && this._detailsModalIsOpen != value && !this.mainModalWasOpen) {
      this.router.navigate(['main/services']);
    }

    this._detailsModalIsOpen = value;
  }

  get detailsModalIsOpen() {
    return this._detailsModalIsOpen;
  }

  onModalClose(): void {
    if (this.mainModalWasOpen) {
      this.mainModalWasOpen = false;
      this.showServiceDetailsModal()
    }
  }


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private serviceService: ServiceService,
    public notifications: NotificationService,
  ) {}


  ngOnInit(): void {
    this.updateServiceList();
    // this.updateSubscription = interval(10000).subscribe(
    //   () => this.updateServiceList()
    // );
    this.subscribeToNotifications();

    this.route.params.subscribe((params) => {
      if (params !== {} && params.serviceType !== undefined
        && params.serivceName !== undefined) {
        this.serviceService
          .servicesInfoServicetypeServicenameGet(params.serviceType, params.serivceName)
          .subscribe({
            next: (services) => {
              this.setSelectedService(services.services[0])
            },
          });
        this.closeAllModals();
        this.detailsModalIsOpen = true;
      }
    });
  }

  subscribeToNotifications(){
    this.notifications.notifications.subscribe(x => {
      this.notificationIsOpen = false;
      setTimeout(() => {
        this.notification = x;
        this.notificationIsOpen = true;
      }, 25);
    });
  }

  updateServiceList(): void {
    this.serviceService.servicesInfoGet().subscribe({
      next: services => {
        this.services = arraySort(services.services, ["type", "name"]);
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
    this.router.navigate(['main/services', service.type, service.name]);
  }

  closeAllModals(): void {
    if (this.detailsModalIsOpen)
      this.mainModalWasOpen = true;

    this.detailsModalIsOpen = false;
    this.deleteModalIsOpen = false;
    this.editorModalIsOpen = false;
  }

  deleteService(): void {
    let closure = this.selectedService;

    this.serviceService.servicesServicetypeServicenameDelete(
      closure.type,
      closure.name).subscribe({
        next: () => {
          this.notifications.add(
            new Notification(
              NotificationType.Info,
              closure.name + ': Service successful deleted.',
              ' Type: ' + closure.type +
              ' Service Name: ' + closure.name +
              ': Service successful deleted.',
            ));
          this.router.navigate(['main/services']);
        },
        error: msg => { console.log(msg); }
      });
  }

  setSelectedService(service: DtosServiceInstanceDetailsDto) {
    this.selectedService = service;
  }

  showDeleteModal(): void {
    this.closeAllModals();
    this.deleteModalIsOpen = true;
  }

  showActionModal(selectedAction): void {
    this.closeAllModals();
    this.actionModal.displayAction(this.selectedService, selectedAction);
  }

  showServiceDetailsModal(): void {
    this.closeAllModals();
    this.redirectToService(this.selectedService);
    this.detailsModalIsOpen = true;
  }

  showYamlEditorModal(): void {
    this.notificationIsOpen = false;
    this.closeAllModals()
    this.editorModalIsOpen = true;

    this.serviceService.servicesYamlServicetypeServicenameGet(
      this.selectedService.type, this.selectedService.name).subscribe({
        next: (dtosServiceYamlDto) => {
          this.aceEditor.session.setValue(dtosServiceYamlDto.yaml);
        },
      });
  }


  ngOnDestroy(): void {
    // this.updateSubscription.unsubscribe();
  }
}
