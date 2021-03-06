import {Component, OnInit} from '@angular/core';
import {DtosServiceInstanceActionDto, DtosServiceInstanceDetailsDto, ServiceService} from '../../share/swagger-auto-gen';
import {Notification, NotificationService, NotificationType} from '../../services/notification/notification.service';

@Component({
  selector: 'app-action-modal',
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.scss']
})
export class ActionModalComponent implements OnInit {

  selectedService: DtosServiceInstanceDetailsDto = {};
  selectedAction: DtosServiceInstanceActionDto = {};

  openModal = false;
  selectedPlaceholder: {};
  selectedPlaceholderKeys: string[];
  selectedPlaceholderTypes =  {} ;

  public notification: Notification | null = null;
  public shouldDisplayNotification = false;

  constructor(
    private serviceService: ServiceService,
    private notifications: NotificationService,
  ) { }

  ngOnInit(): void {
    this.notifications.notifications.subscribe(x => {
      this.shouldDisplayNotification = false;
      setTimeout(() => {
        this.notification = x;
        this.shouldDisplayNotification = true;
      }, 25);
    });
    this.shouldDisplayNotification = false;
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

    if (this.selectedAction.placeholder !== 'null'){

      this.selectedPlaceholder = JSON.parse(this.selectedAction.placeholder);
      this.selectedPlaceholderKeys = Object.keys(this.selectedPlaceholder);

      let keyCount;
      for (keyCount = 0; keyCount < this.selectedPlaceholderKeys.length; keyCount++) {

        const keyName = this.selectedPlaceholderKeys[keyCount];
        const valueType = (typeof this.selectedPlaceholder[keyName]);
        this.selectedPlaceholderTypes[keyName] = valueType;

      }

  }
    this.shouldDisplayNotification = false;
    this.openModal = true;
  }

  executeAction(): void{
    let updatePlaceholder = '{}';
    if (this.selectedPlaceholderKeys.length !== 0){
      updatePlaceholder = JSON.stringify(this.selectedPlaceholder);
    }
    this.serviceService.servicesActionServicetypeServicenameActioncommandPost(
      updatePlaceholder,
      this.selectedService.type,
      this.selectedService.name,
      this.selectedAction.command).subscribe({
      next: () => {
        this.notifications.add(
          new Notification(
            NotificationType.Info,
            this.selectedAction.name + ': Action successful executed.',
            ' Type: ' + this.selectedService.type +
            ' Service Name: ' + this.selectedService.name,
          )
        );
        this.closeAction();
      },
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
