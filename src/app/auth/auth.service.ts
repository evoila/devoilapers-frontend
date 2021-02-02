import { Injectable } from '@angular/core';
import {Configuration} from '../rest';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apiConfiguration: Configuration) { }

  public isAuthenticated(): boolean {
    return Boolean(sessionStorage.getItem('isValid'))
  }

  public loadLoginData(): boolean {
    if (localStorage.getItem('rememberMe')){
      sessionStorage.setItem('username', localStorage.getItem('rememberMe'));
      sessionStorage.setItem('username', localStorage.getItem('username'));
      sessionStorage.setItem('password', localStorage.getItem('password'));
      sessionStorage.setItem('isValid', localStorage.getItem('isValid'));
      sessionStorage.setItem('role', localStorage.getItem('role'));
    }
    return this.isAuthenticated()
  }

  public login(rememberMe: boolean, username: string, password: string, isValid: boolean, role: string): void {

    sessionStorage.setItem('username', username);
    sessionStorage.setItem('password', password);
    sessionStorage.setItem('isValid', '' + isValid)
    sessionStorage.setItem('role', role);
    sessionStorage.setItem('rememberMe', '' + rememberMe);

    if (rememberMe) {
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      localStorage.setItem('isValid', '' + isValid)
      localStorage.setItem('role', role);
      localStorage.setItem('rememberMe', '' + rememberMe);
    }

    this.apiConfiguration.username = username;
    this.apiConfiguration.password = password;
  }

  public getUsername(): string {
    return sessionStorage.getItem('username')
  }

  public getPassword(): string {
    return sessionStorage.getItem('password')
  }

  public getRole(): string {
    return sessionStorage.getItem('role')
  }

  public getRememberMe(): string {
    return sessionStorage.getItem('rememberMe')
  }

  public logout(): void {
    localStorage.clear();
    sessionStorage.clear();
  }

}
