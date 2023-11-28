import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateAccountPageRoutingModule } from './update-account-routing.module';

import { UpdateAccountPage } from './update-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateAccountPageRoutingModule
  ],
  declarations: [UpdateAccountPage]
})
export class UpdateAccountPageModule {}
