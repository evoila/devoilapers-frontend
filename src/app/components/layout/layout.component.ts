import { Router } from '@angular/router';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import {Outlet} from '../../services/notification/outlet';

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
    this.notificationService.useOutletOnSuccess(Outlet.global);
    this.subscribeToNotificationOutlet();
  }

  subscribeToNotificationOutlet(): void {
    this.notificationService.currentNotificationOutlet.subscribe(
      notificationOutlet => {
        this.notificationOutlet = notificationOutlet;
        this.notificationIsOpen();
        this.cdRef.detectChanges();
      }
    );
    this.useGlobalNotification();
  }

  notificationIsOpen(): boolean {
    return this.notificationOutlet === Outlet.global;
  }

  useGlobalNotification(): void {
    this.notificationService.useOutletOnSuccess(Outlet.global);
  }

  onLogout(): void {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
