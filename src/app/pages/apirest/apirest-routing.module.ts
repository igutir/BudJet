import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApirestPage } from './apirest.page';

const routes: Routes = [
  {
    path: '',
    component: ApirestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApirestPageRoutingModule {}
