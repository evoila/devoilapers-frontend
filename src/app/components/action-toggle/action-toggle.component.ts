import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DtosServiceInstanceActionDto, ServiceService, DtosServiceInstanceDetailsDto } from 'src/app/share/swagger-auto-gen';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NotificationType } from '../../services/notification/notificationtype';
import { Notification } from '../../services/notification/notification';
import { Outlet } from '../../services/notification/outlet';

@Component({
  selector: 'app-action-toggle',
  // Bind the "mySchema" member to the schema string of the Form component.
  templateUrl: './action-toggle.component.html',
  styleUrls: ['./action-toggle.component.scss']
})
export class ActionToggleComponent implements OnInit {

  @Input() service: DtosServiceInstanceDetailsDto;
  @Input() action: DtosServiceInstanceActionDto;

  /**
   *
   */
  constructor(private serviceService: ServiceService, private notificationService: NotificationService) {

  }

  toggleValue = false;

  ngOnInit(): void {
    this.serviceService.servicesActionServicetypeServicenameActioncommandPost(
      '{ "toggle": "get" }',
      this.service.type,
      this.service.name,
      this.action.command
    ).subscribe({
      next: (response) => {
        const actionResultJson = response.resultJson;
        this.toggleValue = actionResultJson === 'true';
      },
    });
  }

  setActionToggleSwitchValue(switchChangedEvent) {
    const isChecked: boolean = switchChangedEvent.currentTarget.checked;
    const query = isChecked ? 'set' : 'unset';

    this.serviceService.servicesActionServicetypeServicenameActioncommandPost(
      '{ "toggle": "' + query + '" }',
      this.service.type,
      this.service.name,
      this.action.command
    ).subscribe({
      next: (response) => {
        const actionResultJson = response.resultJson;

        this.notificationService.useOutletOnSuccess(Outlet.detailsModal);
        this.notificationService.addSuccess(
          new Notification(
            NotificationType.Info,
            this.action.name +  ': Action successful executed. Is now ' + (isChecked ? 'enabled' : 'disabled') + '.',
            ' Type: ' + this.service.type +
            ' Service Name: ' + this.service.name,
          )
        );

        this.toggleValue = isChecked;
      },
    });
  }


}
