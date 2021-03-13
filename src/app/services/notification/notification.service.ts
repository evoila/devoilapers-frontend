import {Injectable, OnInit} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {not} from '@angular/compiler/src/output/output_ast';

export enum NotificationType {
  Warning = 'warning' as any,
  Info = 'info' as any,
  Danger = 'danger' as any
}

export interface NotificationActionLink {
  title: string;
  routerLink: string[];
}

export class Notification {
  constructor(
    public readonly type: NotificationType,
    public readonly message: string,
    public readonly detail: string,
    public readonly link?: NotificationActionLink) {
  }
}

@Injectable()
export class NotificationService implements OnInit {

  private notificationOutlet:string;

  private notificationOutletSuccess: string;
  private notificationOutletError: string;

  private notification: Notification;

  private notificationOutletBS = new BehaviorSubject<string>("global");
  public currentNotificationOutlet = this.notificationOutletBS.asObservable();

  private notificationBS = new BehaviorSubject<Notification>(null);
  public currentNotification = this.notificationBS.asObservable();

  ngOnInit() {
    this.currentNotificationOutlet.subscribe(
      notificationOutlet => this.notificationOutlet = notificationOutlet)
    this.currentNotification.subscribe(
      notification => this.notification = notification)
  }

  public isOpen(outlet: string): boolean {
    return outlet === this.notificationOutletSuccess;
  }

  public close(): void {
    this.notificationBS.next(null);
  }

  public addSuccess(notification: Notification) {
    this.notificationOutletBS.next(this.notificationOutletSuccess);
    this.notificationBS.next(notification);
  }

  public addError(notification: Notification) {
    this.notificationOutletBS.next(this.notificationOutletError);
    console.log(this.notificationOutlet);
    this.notificationBS.next(notification);
  }

  useGlobalNotificationSuccess(): void {
    this.notificationOutletSuccess = 'global';
  }

  useDetailsModalNotificationSuccess(): void {
    this.notificationOutletSuccess = 'detailsModal';
  }

  useActionModalNotificationSuccess(): void {
    this.notificationOutletSuccess = 'actionModal';
  }

  useEditorModalNotificationSuccess(): void {
    this.notificationOutletSuccess = 'editorModal';
  }

  useDeleteModalNotificationSuccess(): void {
    this.notificationOutletSuccess = 'deleteModal';
  }

  useGlobalNotificationError(): void {
    this.notificationOutletError = 'global';
  }

  useDetailsModalNotificationError(): void {
    this.notificationOutletError = 'detailsModal';
  }

  useActionModalNotificationError(): void {
    this.notificationOutletError = 'actionModal';
  }

  useEditorModalNotificationError(): void {
    this.notificationOutletError = 'editorModal';
  }

  useDeleteModalNotificationError(): void {
    this.notificationOutletError = 'deleteModal';
  }
}
