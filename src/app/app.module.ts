import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts'; //dashboard
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardsComponent } from './components/dashboards/dashboards.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button'; 
import {MatCardModule} from '@angular/material/card';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DownloadOrderComponent } from './components/download-order/download-order.component';
import { ListOrderComponent } from './components/list-order/list-order.component'; 
import {MatDividerModule} from '@angular/material/divider'; 
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    DashboardsComponent,
    DownloadOrderComponent,
    ListOrderComponent
  ],
  imports: [
    BrowserModule,
     MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatPaginatorModule,
    AppRoutingModule
  ],
  providers: [
    provideCharts(withDefaultRegisterables()),  // provider for charts dashboards
    provideAnimationsAsync(),
    provideHttpClient(), // for http requests 
  ], // for dashboards
  bootstrap: [AppComponent]
})
export class AppModule { }
