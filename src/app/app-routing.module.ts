import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardsComponent } from './components/dashboards/dashboards.component';
import { ListOrderComponent } from './components/list-order/list-order.component';
import {NewMissionOrderComponent} from './components/new-mission-order/new-mission-order.component';

const routes: Routes = [
 {path:'',redirectTo:'new-mission-order',pathMatch:'full'},
  { path: 'analytics', component:DashboardsComponent },
  {path:'orders',component:ListOrderComponent},
  {path:'new-mission-order',component:NewMissionOrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {

 }
