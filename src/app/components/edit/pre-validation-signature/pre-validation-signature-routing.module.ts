import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PreValidationSignatureComponent} from './page/pre-validation-signature.component';


const routes: Routes = [
  {path:'',component:PreValidationSignatureComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes) ],
  exports: [RouterModule]
})
export class PreValidationSignatureRoutingModule { }
