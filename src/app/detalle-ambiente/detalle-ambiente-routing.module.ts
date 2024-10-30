import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleAmbientePage } from './detalle-ambiente.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleAmbientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleAmbientePageRoutingModule {}
