import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteMovementPage } from './delete-movement.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteMovementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteMovementPageRoutingModule {}
