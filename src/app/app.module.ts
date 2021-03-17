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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NotificationService} from './services/notification/notification.service';
import {NotificationsModule} from './modules/notifications-banner/notifications-banner.module';
import {HttpErrorInterceptor} from './share/http-interceptor/http-message-interceptor.service';
import { StingComponent } from './components/clarity-form-components/string/sting.component';
import { SelectComponent } from './components/clarity-form-components/select/select.component';
import {SchemaFormModule} from 'ngx-schema-form';
import { IntegerComponent } from './components/clarity-form-components/integer/integer.component';
import { ObjectLayoutComponent } from './components/clarity-form-components/object-layout/object-layout.component';
import {CheckboxComponent} from './components/clarity-form-components/checkbox/checkbox.component';
import {RadioComponent} from './components/clarity-form-components/radio/radio.component';
import {FileComponent} from './components/clarity-form-components/file/file.component';

@NgModule({
  declarations: [
    AppComponent,
    StingComponent,
    SelectComponent,
    IntegerComponent,
    ObjectLayoutComponent,
    CheckboxComponent,
    RadioComponent,
    FileComponent
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
    ReactiveFormsModule,
    SchemaFormModule,
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
