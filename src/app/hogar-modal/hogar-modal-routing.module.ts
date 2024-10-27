import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HogarModalPage } from './hogar-modal.page';

const routes: Routes = [
  {
    path: '',
    component: HogarModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HogarModalPageRoutingModule {}
