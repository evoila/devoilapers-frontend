import {Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification/notification.service';
import {Notification} from '../../services/notification/notification';


@Component({
  selector: 'app-notification-banner',
  templateUrl: './notification-banner.component.html',
  styleUrls: ['./notification-banner.component.scss']
})
export class NotificationBannerComponent implements OnInit {

  toggleMessageDescription = true;
  actionButtonLabel = 'Details';

  notification: Notification = null;
  alertClosed = true;

  constructor(
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.notificationService.currentNotification.subscribe(
      notification => {
        this.notification = notification;
        this.alertClosed = false;
      }
    );
  }

  toggleErrorNotificationDetail(): void {
    this.toggleMessageDescription = !this.toggleMessageDescription;
    this.actionButtonLabel = this.actionButtonLabel === 'Details' ? 'Less' : 'Details';
  }

}
