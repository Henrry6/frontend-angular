import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryAdministrationRoutingModule } from './delivery-administration-routing.module';
import { UserAdministrationRoutingModule } from '../user-administration/user-administration-routing.module';
import { TableModule } from 'primeng/table';

import {SpeedDialModule} from 'primeng/speeddial';
import {RippleModule} from 'primeng/ripple';
import {DialogModule} from 'primeng/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressBarModule} from 'primeng/progressbar';
import {SplitButtonModule} from 'primeng/splitbutton';
import {DropdownModule} from 'primeng/dropdown';
import {PasswordModule} from 'primeng/password';
import {DividerModule} from 'primeng/divider';
import {InputSwitchModule} from 'primeng/inputswitch';
import {KeyFilterModule} from 'primeng/keyfilter';
import { DeliveryAdministrationComponent } from './delivery-administration.component';
import { DeliveryAdministrationFormComponent } from './delivery-administration-form/delivery-administration-form.component';


@NgModule({
  declarations: [
    DeliveryAdministrationComponent,
    DeliveryAdministrationFormComponent
  ],
  imports: [
    DeliveryAdministrationRoutingModule,
    CommonModule,
    TableModule,
    SpeedDialModule,
    RippleModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    InputTextModule,
    InputSwitchModule,
    ProgressBarModule,
    SplitButtonModule,
    PasswordModule,
    DividerModule,
    KeyFilterModule,
  ]
})
export class DeliveryAdministrationModule { }
