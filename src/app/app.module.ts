import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MainModule } from './modules/main/main.module';
import { LoginModule } from './modules/login/login.module';
import { FormsModule } from '@angular/forms';
import {NotificationService} from './services/notification/notification.service';
import {NotificationsModule} from './modules/notifications-banner/notifications-banner.module';
import {HttpErrorInterceptor} from './share/http-interceptor/HttpErrorInterceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MainModule,
    LoginModule,
    FormsModule,
    NotificationsModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    { provide: NotificationService }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
