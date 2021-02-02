import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService, DtosAccountCredentialsDto } from 'src/app/rest';
import {AuthService} from '../../../auth/auth.service';

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

  constructor(
    private router: Router,
    private accountServce: AccountService,
    public auth: AuthService,
) { }

  ngOnInit() {
    if (this.auth.loadLoginData()){
      this.onLogin();
    }
  }

  onLogin() {
    if (this.username
        && this.password){
          const dtosAccountCredentialsDto = {
            username: this.username,
            password: this.password,
          } as DtosAccountCredentialsDto;
          this.accountServce.accountsLoginPost(dtosAccountCredentialsDto).subscribe({
        next: auth => {
          if (auth.isValid) {
            this.auth.login(this.rememberMe, this.username, this.password, auth.isValid, auth.role)
            this.router.navigate(['main']);
          } else {
            this.isError = true;
          }
        },
        error: msg => {
          this.isError = true;
          this.msgError = msg.message;
          if (msg.status === 401){
            this.msgError = 'Invalid user name or password';
          }
        }
      });
    }
  }
}
