import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from '../../components/main-page/main-page.component';
import { PageNotFoundComponent } from '../../components/page-not-found/page-not-found.component';
import { AboutComponent } from '../../components/about/about.component';
import { LayoutComponent } from '../../components/layout/layout.component';
import { ConfigurationParameters, Configuration } from '../../share/swagger-auto-gen';
import { ApiModule } from '../../share/swagger-auto-gen';
import { ServicestoreComponent } from '../../components/servicestore/servicestore.component';
import { ServicesComponent } from '../../components/services/services.component';
import { ServiceDetailsComponent } from '../../components/service-details/service-details.component';
import { ActionModalComponent } from '../../components/action-modal/action-modal.component';
import {NotificationsModule} from '../notifications-banner/notifications-banner.module';
import {BrandingComponent} from '../../components/branding/branding/branding.component';
import {FormsComponent} from '../../components/forms/forms.component';

import { BrowserModule } from "@angular/platform-browser";
import {
  SchemaFormModule,
  WidgetRegistry,
  DefaultWidgetRegistry,
} from "ngx-schema-form";


export function configurationFactory(): Configuration {
  const params: ConfigurationParameters = {
    username: sessionStorage.getItem('username'),
    password: sessionStorage.getItem('password'),
  };
  return new Configuration(params);
}

@NgModule({
  declarations: [
    MainPageComponent,
    PageNotFoundComponent,
    AboutComponent,
    LayoutComponent,
    ServicestoreComponent,
    ServicesComponent,
    ServiceDetailsComponent,
    ActionModalComponent,
    BrandingComponent,
    FormsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    MainRoutingModule,
    SchemaFormModule.forRoot(),
    ApiModule.forRoot(configurationFactory),
    NotificationsModule,
  ],
  providers: [{ provide: WidgetRegistry, useClass: DefaultWidgetRegistry }],
})
export class MainModule {}
