import {ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService, DtosAccountCredentialsDto } from 'src/app/share/swagger-auto-gen';
import {AuthService} from '../../services/auth/auth.service';
import {NotificationService} from '../../services/notification/notification.service';
import {Outlet} from '../../services/notification/outlet';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [ AccountService ]
})

export class LoginPageComponent implements OnInit, OnDestroy {
  rememberMe = false;

  username = '';
  password = '';

  isValid = false;
  role = '';

  isError = false;
  msgError = 'Invalid user name or password';
  private notificationOutlet: string;

  constructor(
    private router: Router,
    private accountService: AccountService,
    public auth: AuthService,
    private notificationService: NotificationService,
    private cdRef: ChangeDetectorRef,
    ) { }

  ngOnInit(): void {
    this.notificationService.useOutletOnError(Outlet.global);
    this.subscribeToNotificationOutlet();
    if (this.auth.loadLoginData()){
      this.onLogin();
    }
  }

  subscribeToNotificationOutlet(): void {
    this.notificationService.currentNotificationOutlet.subscribe(
      notificationOutlet => {
        this.notificationOutlet = notificationOutlet;
        this.cdRef.detectChanges();
      }
    );
  }

  notificationIsOpen(): boolean {
    return this.notificationOutlet === Outlet.global;
  }

  onLogin(): void {
    if (this.username
        && this.password){
          const dtosAccountCredentialsDto = {
            username: this.username,
            password: this.password,
          } as DtosAccountCredentialsDto;
          this.accountService.accountsLoginPost(dtosAccountCredentialsDto)
            .subscribe({
        next: auth => {
          if (auth.isValid) {
            this.auth.login(this.rememberMe,
              this.username, this.password,
              auth.isValid, auth.role);
            this.router.navigate(['main']);
          } else {
            this.isError = true;
          }
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.notificationService.close();
  }
}
