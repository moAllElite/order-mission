import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import {MatTreeModule} from '@angular/material/tree';
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
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CustomSidebarComponent} from './components/custom-sidebar/custom-sidebar.component';
import {MatStepperModule} from '@angular/material/stepper';
import { OrderMisssionDetailComponent } from './components/order-misssion-detail/order-misssion-detail.component';

// for french support
import{registerLocaleData} from "@angular/common";
import localeFr from '@angular/common/locales/fr';
import { ExpansionComponent } from './components/widgets/expansion/expansion.component';
import {MatExpansionModule, MatExpansionPanel, MatExpansionPanelActionRow} from '@angular/material/expansion';
import {PreValidationSignatureModule} from './components/edit/pre-validation-signature/pre-validation-signature.module';
import {
  PreValidationSignatureComponent
} from './components/edit/pre-validation-signature/page/pre-validation-signature.component';
import {SignaturePadComponent} from './components/signature-pad/signature-pad.component';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { SnackBarComponent } from './components/widgets/snack-bar/snack-bar.component';
import { MatTabsModule } from '@angular/material/tabs';
registerLocaleData(localeFr, 'fr');

import Keycloak from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';

function initializeKeycloak(keycloak: KeycloakService) {
  return async () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'jhispter',
        clientId: 'web_app',
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      },
    });
}



@NgModule({
  declarations: [
    AppComponent,
    ListOrderComponent,
    NewMissionOrderComponent,
    CustomSidebarComponent,
    OrderMisssionDetailComponent,
    ExpansionComponent,
    PreValidationSignatureComponent,
  ],
  imports: [
    BrowserModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatGridListModule,
    MatStepperModule,
    MatTreeModule,
    MatToolbarModule,
    MatTableModule,
    MatTabsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatMenuModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDividerModule,
    MatTreeModule,
    MatPaginatorModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatExpansionModule,
    MatExpansionPanelActionRow,
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
    MatSidenavModule,
    MatExpansionModule,
    PreValidationSignatureModule,
    MatSnackBarModule,
    SignaturePadComponent,
    SnackBarComponent
],
  providers: [
    provideAnimationsAsync(),
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 15500}},
    {provide: LOCALE_ID, useValue: "fr-FR"},// for french support
    provideHttpClient(), provideCharts(withDefaultRegisterables()), // for http requests,
  ],
  exports: [

  ],
  // for dashboards
  bootstrap: [AppComponent]
})
export class AppModule { }
