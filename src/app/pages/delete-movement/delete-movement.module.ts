import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteMovementPageRoutingModule } from './delete-movement-routing.module';

import { DeleteMovementPage } from './delete-movement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeleteMovementPageRoutingModule
  ],
  declarations: [DeleteMovementPage]
})
export class DeleteMovementPageModule {}
