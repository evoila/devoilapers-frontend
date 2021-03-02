import {ComponentRef, Input, NgModule, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from './about/about.component';
import { LayoutComponent } from './layout/layout.component';

import { ConfigurationParameters, Configuration } from '../../rest'
import { ApiModule } from '../../rest'
import { ServicestoreComponent } from './servicestore/servicestore.component';
import { ServicesComponent } from './services/services.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import {ActionModalComponent} from './action-modal/action-modal.component';

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
    ActionModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    MainRoutingModule,
    ApiModule.forRoot(configurationFactory),
  ]
})
export class MainModule {}
