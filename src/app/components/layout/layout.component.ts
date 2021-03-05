import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Notification, NotificationService, NotificationType } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  collapsed = true;

  public notification: Notification | null = null;
  public shouldDisplayNotification = false;

  constructor(
    public auth: AuthService,
    private router: Router,
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

  }

  onLogout(): void {
    this.auth.logout()
    this.router.navigate(['login']);
  }

}
