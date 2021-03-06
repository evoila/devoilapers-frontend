import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../../components/page-not-found/page-not-found.component';
import { AboutComponent } from '../../components/about/about.component';
import { LayoutComponent } from '../../components/layout/layout.component';
import { ServicesComponent } from '../../components/services/services.component';
import { ServicestoreComponent } from '../../components/servicestore/servicestore.component';
import { ServiceDetailsComponent } from '../../components/service-details/service-details.component';
import { AuthGuardService } from '../../services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'main',
    component: LayoutComponent,
    canActivate: [ AuthGuardService ],
    children: [
      { path: '', redirectTo: 'services', pathMatch: 'full' },
      { path: 'servicestore', component: ServicestoreComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'service-details/:serviceType/:serivceName', component: ServiceDetailsComponent},
      { path: 'about', component: AboutComponent },
      { path: '**', component: PageNotFoundComponent },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class MainRoutingModule { }
