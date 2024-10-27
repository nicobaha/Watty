import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmbienteModalPage } from './ambiente-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AmbienteModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmbienteModalPageRoutingModule {}
