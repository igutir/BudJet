import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateMovementPageRoutingModule } from './update-movement-routing.module';

import { UpdateMovementPage } from './update-movement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateMovementPageRoutingModule
  ],
  declarations: [UpdateMovementPage]
})
export class UpdateMovementPageModule {}
