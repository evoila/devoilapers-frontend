import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService, DtosAccountCredentialsDto } from 'src/app/rest';

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

  isError = false;
  msgError = '';

  constructor(
    private router: Router,
    private accountServce: AccountService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('rememberMe')){
      this.rememberMe = localStorage.getItem('rememberMe') === 'true';
    }
    if (localStorage.getItem('username')){
      this.username = localStorage.getItem('username');
    }
    if (localStorage.getItem('password')){
      this.password = localStorage.getItem('password');
    }
    this.onLogin()
  }

  onLogin() {
    if (this.username
        && this.password){
          let dtosAccountCredentialsDto = {
            username: this.username,
            password: this.password,
          } as DtosAccountCredentialsDto;
          this.accountServce.accountsLoginPost(dtosAccountCredentialsDto).subscribe({
        next: auth => {
          if (auth.isValid) {
            localStorage.setItem('rememberMe', ""+this.rememberMe);
            localStorage.setItem('username', this.username);
            localStorage.setItem('password', this.password);
            localStorage.setItem('role', auth.role);
            this.router.navigate(['main']);
          } else {
            this.isError = true;
          };
        },
        error: msg => {
          this.isError = true;
          this.msgError = msg
        }
      })
    }
  }
}
