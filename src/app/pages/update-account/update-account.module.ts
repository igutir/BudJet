import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateAccountPageRoutingModule } from './update-account-routing.module';

import { UpdateAccountPage } from './update-account.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateAccountPageRoutingModule,
    ComponentsModule
  ],
  declarations: [UpdateAccountPage]
})
export class UpdateAccountPageModule {}
