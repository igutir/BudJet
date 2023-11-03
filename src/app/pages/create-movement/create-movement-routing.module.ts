import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateMovementPage } from './create-movement.page';

const routes: Routes = [
  {
    path: '',
    component: CreateMovementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateMovementPageRoutingModule {}
