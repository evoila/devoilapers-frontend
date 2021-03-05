import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService, DtosAccountCredentialsDto } from 'src/app/share/swagger-auto-gen';
import {AuthService} from '../../services/auth/auth.service';
import {Notification, NotificationService} from '../../services/notification/notification.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [ AccountService ]
})

export class LoginPageComponent implements OnInit {
  rememberMe = false;

  username = '';
  password = '';

  isValid = false;
  role = '';

  isError = false;
  msgError = 'Invalid user name or password';

  public notification: Notification | null = null;
  public shouldDisplayNotification = false;

  constructor(
    private router: Router,
    private accountServce: AccountService,
    public auth: AuthService,
    private notifications: NotificationService,
) { }

  ngOnInit(): void {

    if (this.auth.loadLoginData()){
      this.onLogin();
    }

    this.notifications.notifications.subscribe(x => {
      this.shouldDisplayNotification = false;
      setTimeout(() => {
        this.notification = x;
        this.shouldDisplayNotification = true;
      }, 25);
    });

  }

  onLogin(): void {
    if (this.username
        && this.password){
          const dtosAccountCredentialsDto = {
            username: this.username,
            password: this.password,
          } as DtosAccountCredentialsDto;
          this.accountServce.accountsLoginPost(dtosAccountCredentialsDto).subscribe({
        next: auth => {
          if (auth.isValid) {
            this.auth.login(this.rememberMe, this.username, this.password, auth.isValid, auth.role);
            this.router.navigate(['main']);
          } else {
            this.isError = true;
          }
        },
      });
    }
  }
}
