import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { LoginRoutingModule } from './login-routing.module';
import { LoginPageComponent } from '../../components/login-page/login-page.component';
import {NotificationsModule} from '../notifications-banner/notifications-banner.module';

@NgModule({
  declarations: [
    LoginPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    LoginRoutingModule,
    NotificationsModule,
  ]
})
export class LoginModule { }
