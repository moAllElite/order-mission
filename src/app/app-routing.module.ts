import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardsComponent } from './components/dashboards/dashboards.component';
import { DownloadOrderComponent } from './components/download-order/download-order.component';

const routes: Routes = [
  { path: 'dashboards', component:DashboardsComponent },
  {path:'view',component:DownloadOrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {

 }
