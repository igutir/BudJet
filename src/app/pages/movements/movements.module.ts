import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovementsPageRoutingModule } from './movements-routing.module';

import { MovementsPage } from './movements.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovementsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MovementsPage]
})
export class MovementsPageModule {}
