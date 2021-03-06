import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Notification } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-notification-banner',
  templateUrl: './notification-banner.component.html',
  styleUrls: ['./notification-banner.component.scss']
})
export class NotificationBannerComponent implements OnInit {
  @Input()
  public notification: Notification;

  @Output()
  public readonly closer: EventEmitter<any> = new EventEmitter();

  displayMsg = '';
  actionButtonLabel = 'Details';

  constructor() { }

  ngOnInit(): void {
    this.displayMsg = this.notification.message;
  }

  public onClose(): void {
    this.closer.emit();
  }

  toggleErrorNotificationDetail(): void{
    this.displayMsg = this.displayMsg === this.notification.message ? this.notification.detail : this.notification.message;
    this.actionButtonLabel = this.actionButtonLabel === 'Details' ? 'Less' : 'Details';
  }

}
