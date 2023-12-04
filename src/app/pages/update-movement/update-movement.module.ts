import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateMovementPageRoutingModule } from './update-movement-routing.module';

import { UpdateMovementPage } from './update-movement.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateMovementPageRoutingModule,
    ComponentsModule
  ],
  declarations: [UpdateMovementPage]
})
export class UpdateMovementPageModule {}
