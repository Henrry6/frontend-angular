import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryAdministrationComponent } from './delivery-administration.component';

const routes: Routes = [
  {
    path: '', component: DeliveryAdministrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryAdministrationRoutingModule { }
