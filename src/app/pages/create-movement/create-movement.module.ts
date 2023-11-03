import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateMovementPageRoutingModule } from './create-movement-routing.module';

import { CreateMovementPage } from './create-movement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateMovementPageRoutingModule
  ],
  declarations: [CreateMovementPage]
})
export class CreateMovementPageModule {}
