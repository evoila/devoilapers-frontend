import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DtosServiceInstanceActionDto, DtosServiceInstanceDetailsDto, ServiceService } from '../../share/swagger-auto-gen';
import { Notification, NotificationService, NotificationType } from '../../services/notification/notification.service';
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-action-modal',
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.scss']
})
export class ActionModalComponent implements OnInit {

  selectedService: DtosServiceInstanceDetailsDto = {};
  selectedAction: DtosServiceInstanceActionDto = {};

  @Output()
  closeEvent = new EventEmitter();


  private _openModal = false;
  set openModal(value: boolean) {
    const oldValue = this._openModal
    this._openModal = value;

    if (oldValue != value && !value && !this.openResponseModal && !this.responseModalIsOpening)
      this.closeEvent.emit()
  }

  get openModal() {
    return this._openModal;
  }

  private _openResponseModal = false;
  set openResponseModal(value: boolean) {
    const oldValue = this._openResponseModal;
    this._openResponseModal = value;

    if (oldValue != value && !value && !this.openModal)
      this.closeEvent.emit()
  }

  get openResponseModal() {
    return this._openResponseModal;
  }

  private responseModalIsOpening = false;


  responseMessage: string;

  selectedPlaceholder: {};
  selectedPlaceholderKeys: string[];
  selectedPlaceholderTypes = {};

  notification: Notification | null = null;

  notificationsIsOpen = false;


  constructor(
    private serviceService: ServiceService,
    private notifications: NotificationService,
  ) { }

  ngOnInit(): void {
    this.subscribeToNotifications();
  }

  subscribeToNotifications(): void {
    this.notifications.notifications.subscribe(x => {
      this.notificationsIsOpen = false;
      setTimeout(() => {
        this.notification = x;
        this.notificationsIsOpen = true;
      }, 25);
    });
  }

  displayAction(
    selectedService: DtosServiceInstanceDetailsDto,
    selectedAction: DtosServiceInstanceActionDto
  ): void {

    this.selectedService = selectedService;
    this.selectedAction = selectedAction;

    this.selectedPlaceholder = {};
    this.selectedPlaceholderKeys = [];
    this.selectedPlaceholderTypes = {};

    if (this.selectedAction.placeholder !== 'null') {

      this.selectedPlaceholder = JSON.parse(this.selectedAction.placeholder);
      this.selectedPlaceholderKeys = Object.keys(this.selectedPlaceholder);

      let keyCount;
      for (keyCount = 0; keyCount < this.selectedPlaceholderKeys.length; keyCount++) {

        const keyName = this.selectedPlaceholderKeys[keyCount];
        const valueType = (typeof this.selectedPlaceholder[keyName]);
        this.selectedPlaceholderTypes[keyName] = valueType;

      }

    }
    this.notificationsIsOpen = false;
    this.openModal = true;
  }

  executeAction(): void {
    let updatePlaceholder = '{}';
    if (this.selectedPlaceholderKeys.length !== 0) {
      updatePlaceholder = JSON.stringify(this.selectedPlaceholder);
    }
    this.serviceService.servicesActionServicetypeServicenameActioncommandPost(
      updatePlaceholder,
      this.selectedService.type,
      this.selectedService.name,
      this.selectedAction.command).subscribe({
        next: (resMsg) => {
          this.notifications.add(
            new Notification(
              NotificationType.Info,
              this.selectedAction.name + ': Action successful executed.',
              ' Type: ' + this.selectedService.type +
              ' Service Name: ' + this.selectedService.name,
            )
          );

          let hasMessage = !(resMsg === null || resMsg === "" || resMsg === {} || resMsg === undefined)


          if (hasMessage) {
            this.responseModalIsOpening = true
          }

          this.closeAction();

          if (hasMessage) {
            this.openResponseModal = true;
            this.responseMessage = JSON.stringify(resMsg, null, 2);
          }
        },
      });
  }

  closeAction(): void {
    this.openModal = false;
  }

  closeActionResponse(): void {
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
