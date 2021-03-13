import { Router } from '@angular/router';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Notification, NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  notificationOutlet: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.notificationService.useGlobalNotificationSuccess();
    this.subscribeToNotificationOutlet();
  }

  subscribeToNotificationOutlet(){
    this.notificationService.currentNotificationOutlet.subscribe(
      notificationOutlet => {
        this.notificationOutlet = notificationOutlet;
        this.notificationIsOpen('global');
        this.cdRef.detectChanges();
      }
    )
    this.useGlobalNotification();
  }

  notificationIsOpen(outlet: string): boolean {
    return this.notificationOutlet === outlet
  }

  useGlobalNotification(): void {
    this.notificationService.useGlobalNotificationSuccess();
  }

  onLogout(): void {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
