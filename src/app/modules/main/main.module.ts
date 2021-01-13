import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from './about/about.component';
import { LayoutComponent } from './layout/layout.component';
import { ServicesComponent } from './services/services.component';
import { ServicestoreComponent } from './servicestore/servicestore.component';

@NgModule({
  declarations: [
    MainPageComponent, PageNotFoundComponent,
    AboutComponent, LayoutComponent,
    ServicesComponent, ServicestoreComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,  
    MainRoutingModule
  ]
})
export class MainModule { }
