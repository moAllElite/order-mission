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
import { ListOrderComponent } from './components/list-order/list-order.component';
import {MatDividerModule} from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {  MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSidenavModule} from '@angular/material/sidenav';
import { CustomSidebarComponent } from './components/custom-sidebar/custom-sidebar.component';
import { MatListModule} from '@angular/material/list';
@NgModule({
  declarations: [
    AppComponent,
    DashboardsComponent,
    ListOrderComponent,
    CustomSidebarComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    MatPaginatorModule,
    MatMenuModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatPaginatorModule,
    AppRoutingModule,
    MatListModule,
    MatSidenavModule
  ],
  providers: [
    provideCharts(withDefaultRegisterables()),  // provider for charts dashboards
    provideAnimationsAsync(),
    provideHttpClient(), // for http requests
  ], // for dashboards
  bootstrap: [AppComponent]
})
export class AppModule { }
