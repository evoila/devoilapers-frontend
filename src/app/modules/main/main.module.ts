import {Injectable, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { ServiceStatusComponent } from 'src/app/components/service-status/service-status.component';
import {CreateServiceWizardFormComponent} from '../../components/create-service-wizard-form/create-service-wizard-form.component';
import {CreateServiceWizardComponent} from '../../components/create-service-wizard/create-service-wizard.component';
import { AceEditorComponent } from '../../components/ace-editor/ace-editor.component';
import { ActionToggleComponent } from '../../components/action-toggle/action-toggle.component';

import {
  SchemaFormModule,
  WidgetRegistry,
  DefaultWidgetRegistry,
} from "ngx-schema-form";
import {ButtonComponent} from '../../components/clarity-form-components/button/button.component';
import {CdsButton} from '@clr/core/button';
import { ClarityWidgetRegistry } from 'src/app/components/clarity-form-components/claritywidgedregistry';


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
    AceEditorComponent,
    CreateServiceWizardFormComponent,
    CreateServiceWizardComponent,
    ServicestoreComponent,
    ServicesComponent,
    ServiceDetailsComponent,
    ActionModalComponent,
    BrandingComponent,
    ButtonComponent,
    ServiceStatusComponent,
    ActionToggleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    MainRoutingModule,
    SchemaFormModule.forRoot(),
    ApiModule.forRoot(configurationFactory),
    NotificationsModule,
    ReactiveFormsModule,
  ],
    providers: [{ provide: WidgetRegistry, useClass: ClarityWidgetRegistry }],
})
export class MainModule {}
