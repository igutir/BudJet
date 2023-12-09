import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateMovementPageRoutingModule } from './update-movement-routing.module';

import { UpdateMovementPage } from './update-movement.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateMovementPageRoutingModule,
    ComponentsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    NgFor,
  ],
  declarations: [UpdateMovementPage]
})
export class UpdateMovementPageModule {}
