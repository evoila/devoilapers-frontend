import { NgModule } from '@angular/core';
import { NotificationBannerComponent } from '../../components/notification-banner/notification-banner.component';
import {ClrAlertModule} from '@clr/angular';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    NotificationBannerComponent,
  ],
  imports: [
    ClrAlertModule,
    CommonModule
  ],
  exports: [
    NotificationBannerComponent,
  ]
})
export class NotificationsModule { }
