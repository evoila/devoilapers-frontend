import {NotificationType} from './notificationtype';
import {NotificationActionLink} from './notificationactionlink';

export class Notification {
  constructor(
    public readonly type: NotificationType,
    public readonly message: string,
    public readonly detail: string,
    public readonly link?: NotificationActionLink) {
  }
}
