import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  username = '';
  password = '';
  isError = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLogin() {
    sessionStorage.setItem('username', this.username);
    sessionStorage.setItem('username', this.password);
    this.router.navigate(['main']);
  }
}
