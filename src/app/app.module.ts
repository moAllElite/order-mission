import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts'; //dashboard
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardsComponent } from './components/dashboards/dashboards.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material/core';
import { ListOrderComponent } from './components/list-order/list-order.component';
import {MatDividerModule} from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule} from '@angular/material/list';
import { NewMissionOrderComponent } from './components/new-mission-order/new-mission-order.component';
import { MatSelectModule } from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    DashboardsComponent,
    ListOrderComponent,
    NewMissionOrderComponent,
    //CustomSidebarComponent
  ],
  imports: [
    BrowserModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatNativeDateModule ,
    ReactiveFormsModule,
    MatMenuModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDividerModule,
    MatPaginatorModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    MatAutocompleteModule,
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
