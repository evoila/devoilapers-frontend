import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { AuthGuardService } from './../../services/auth-guard.service';

import { MainPageComponent } from './main-page/main-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from './about/about.component';
import { LayoutComponent } from './layout/layout.component';
import { ServicesComponent } from './services/services.component';
import { ServicestoreComponent } from './servicestore/servicestore.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';

const routes: Routes = [
  {
    path: 'main',
    component: LayoutComponent,
    // canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: 'services', pathMatch: 'full' },
      { path: 'servicestore', component: ServicestoreComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'service-details/:serviceId', component: ServiceDetailsComponent},
      { path: 'about', component: AboutComponent },
      { path: '**', component: PageNotFoundComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
