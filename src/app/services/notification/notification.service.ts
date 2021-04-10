import {Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Outlet} from './outlet';
import {Notification} from './notification';

@Injectable()
export class NotificationService {

  private notificationOutletSuccess: string;
  private notificationOutletError: string;

  private notificationOutletBS = new BehaviorSubject<string>(Outlet.global);
  public currentNotificationOutlet = this.notificationOutletBS.asObservable();

  private notificationBS = new BehaviorSubject<Notification>(null);
  public currentNotification = this.notificationBS.asObservable();

  public close(): void {
    this.notificationBS.next(null);
  }

  public addSuccess(notification: Notification): void {
    this.notificationOutletBS.next(this.notificationOutletSuccess);
    this.notificationBS.next(notification);
  }

  public addError(notification: Notification): void {
    this.notificationOutletBS.next(this.notificationOutletError);
    this.notificationBS.next(notification);
  }

  useOutlet(outlet: string): void {
    this.notificationOutletSuccess = outlet;
    this.notificationOutletError = outlet;
  }

  useOutletOnSuccess(outlet: string): void {
    this.notificationOutletSuccess = outlet;
  }

  useOutletOnError(outlet: string): void {
    this.notificationOutletError = outlet;
  }
}
