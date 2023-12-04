import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApirestPageRoutingModule } from './apirest-routing.module';

import { ApirestPage } from './apirest.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApirestPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ApirestPage]
})
export class ApirestPageModule {}
