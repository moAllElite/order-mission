import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardsComponent } from './components/dashboards/dashboards.component';
import { ListOrderComponent } from './components/list-order/list-order.component';
import {NewMissionOrderComponent} from './components/new-mission-order/new-mission-order.component';
import { OrderMisssionDetailComponent } from './components/order-misssion-detail/order-misssion-detail.component';
import { SignaturePadComponent } from './components/signature-pad/signature-pad.component';

export const routes: Routes = [
 {path:'',redirectTo:'dashboard',pathMatch:'full'},
  { path: 'dashboard', component:DashboardsComponent,title:'tableau de bord' },
  {path:'orders',component:ListOrderComponent,title:'liste des missions' },
  {path:'order/:num_odm',component:OrderMisssionDetailComponent,title:'détails mission'},
  {path:'signature',component:SignaturePadComponent},
  {path:'new-mission-order',component:NewMissionOrderComponent,title:'demander mission'},
  {
    path:'edit',
    children: [
      {
        path:'pre-valid/:num_odm',
        loadChildren:() => import('./components/edit/pre-validation-signature/pre-validation-signature-routing.module')
          .then(p=> p.PreValidationSignatureRoutingModule)
      },
      {
        path:'valid/:num_odm',
        loadChildren:() => import('./components/edit/pre-validation-signature/pre-validation-signature-routing.module')
          .then(p=> p.PreValidationSignatureRoutingModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {

 }
