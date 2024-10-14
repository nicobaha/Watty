import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecoverPWPage } from './recover-pw.page';

const routes: Routes = [
  {
    path: '',
    component: RecoverPWPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecoverPWPageRoutingModule {}
