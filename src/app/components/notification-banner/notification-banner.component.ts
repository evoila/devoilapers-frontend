import {Component, OnInit, Input, EventEmitter, Output, AfterContentChecked} from '@angular/core';
import { Notification, NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-notification-banner',
  templateUrl: './notification-banner.component.html',
  styleUrls: ['./notification-banner.component.scss']
})
export class NotificationBannerComponent {

  toggleMessageDescription = true;
  actionButtonLabel = 'Details';

  notification: Notification = null;
  alertClosed: boolean = true;

  constructor(
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.notificationService.currentNotification.subscribe(
      notification => {
        this.notification = notification;
        this.alertClosed = false;
      }
    )
  }

  toggleErrorNotificationDetail(): void {
    this.toggleMessageDescription = !this.toggleMessageDescription;
    this.actionButtonLabel = this.actionButtonLabel === 'Details' ? 'Less' : 'Details';
  }

}
