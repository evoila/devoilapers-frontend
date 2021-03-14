import {Component, OnInit, Input, EventEmitter, Output, ChangeDetectorRef} from '@angular/core';
import { DtosServiceInstanceActionDto, DtosServiceInstanceDetailsDto, ServiceService } from '../../share/swagger-auto-gen';
import { NotificationService} from '../../services/notification/notification.service';
import { trigger } from '@angular/animations';
import {Outlet} from '../../services/notification/outlet';
import {NotificationType} from '../../services/notification/notificationtype';
import {Notification} from '../../services/notification/notification';

@Component({
  selector: 'app-action-modal',
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.scss']
})
export class ActionModalComponent implements OnInit{

  selectedService: DtosServiceInstanceDetailsDto = {};
  selectedAction: DtosServiceInstanceActionDto = {};

  @Output()
  closeEvent = new EventEmitter();


  private _openModal = false;
  private notificationOutlet: string;

  set openModal(value: boolean) {
    const oldValue = this._openModal
    this._openModal = value;

    if (oldValue != value && !value && !this.openResponseModal && !this.responseModalIsOpening){
      this.notificationService.useOutlet(Outlet.detailsModal);
      this.closeEvent.emit()
    }
  }

  get openModal() {
    return this._openModal;
  }

  private _openResponseModal = false;
  set openResponseModal(value: boolean) {
    const oldValue = this._openResponseModal;
    this._openResponseModal = value;

    if (oldValue != value && !value && !this.openModal) {
      this.notificationService.useOutlet(Outlet.responseModal);
      this.closeEvent.emit();
    }
  }

  get openResponseModal() {
    return this._openResponseModal;
  }

  private responseModalIsOpening = false;


  responseMessage: string;

  selectedForm: {};
  selectedPlaceholderKeys: string[];
  selectedPlaceholderTypes = {};

  constructor(
    private serviceService: ServiceService,
    private notificationService: NotificationService,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.notificationService.useOutlet(Outlet.global);
    this.subscribeToNotificationOutlet();
  }

  subscribeToNotificationOutlet(){
    this.notificationService.currentNotificationOutlet.subscribe(
      notificationOutlet => {
        this.notificationOutlet = notificationOutlet
        this.cdRef.detectChanges();
      }
    )
  }

  notificationIsOpen(): boolean {
    return this.notificationOutlet === Outlet.actionModal;
  }

  notificationResponseIsOpen(): boolean {
    return this.notificationOutlet === Outlet.responseModal;
  }

  displayAction(
    selectedService: DtosServiceInstanceDetailsDto,
    selectedAction: DtosServiceInstanceActionDto
  ): void {
    this.notificationService.useOutletOnError(Outlet.actionModal);
    this.notificationService.close();

    this.selectedService = selectedService;
    this.selectedAction = selectedAction;

    this.selectedForm = {};
    this.selectedPlaceholderKeys = [];
    this.selectedPlaceholderTypes = {};
    this.responseModalIsOpening = false;
    this.openResponseModal = false;

    if (this.selectedAction.form !== 'null'){

      this.selectedForm = JSON.parse(this.selectedAction.form);
      this.selectedPlaceholderKeys = Object.keys(this.selectedForm);

      let keyCount;
      for (keyCount = 0; keyCount < this.selectedPlaceholderKeys.length; keyCount++) {

        const keyName = this.selectedPlaceholderKeys[keyCount];
        const valueType = (typeof this.selectedForm[keyName]);
        this.selectedPlaceholderTypes[keyName] = valueType;

      }

    }
    this.openModal = true;
  }

  executeAction(): void {
    let updatePlaceholder = '{}';
    if (this.selectedPlaceholderKeys.length !== 0){
      updatePlaceholder = JSON.stringify(this.selectedForm);
    }
    this.notificationService.useOutletOnError(Outlet.actionModal);
    this.serviceService.servicesActionServicetypeServicenameActioncommandPost(
      updatePlaceholder,
      this.selectedService.type,
      this.selectedService.name,
      this.selectedAction.command
    ).subscribe({
        next: (resMsg) => {
          let hasMessage = !(resMsg === null || resMsg === "" || resMsg === {} || resMsg === undefined)

          if (hasMessage) {
            this.responseModalIsOpening = true
          }

          this.closeAction();

          if (hasMessage) {
            this.notificationService.useOutletOnSuccess(Outlet.responseModal);
            this.openResponseModal = true;
            this.responseMessage = JSON.stringify(resMsg, null, 2);
          }

          this.closeAction();

          this.notificationService.addSuccess(
            new Notification(
              NotificationType.Info,
              this.selectedAction.name + ': Action successful executed.',
              ' Type: ' + this.selectedService.type +
              ' Service Name: ' + this.selectedService.name,
            )
          );

        },
      });
  }

  closeAction(): void {
    this.openModal = false;
  }

  closeActionResponse(): void {
    this.responseModalIsOpening = false;
    this.openResponseModal = false;
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
