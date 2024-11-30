import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardsComponent } from './components/dashboards/dashboards.component';
import { ListOrderComponent } from './components/list-order/list-order.component';

const routes: Routes = [
 // {path:'',redirectTo:'orders',pathMatch:'full'},
  { path: 'analytics', component:DashboardsComponent },
  {path:'orders',component:ListOrderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {

 }
