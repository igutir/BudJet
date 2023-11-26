import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateMovementPage } from './update-movement.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateMovementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateMovementPageRoutingModule {}
