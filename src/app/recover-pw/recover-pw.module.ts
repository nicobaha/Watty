import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecoverPWPageRoutingModule } from './recover-pw-routing.module';

import { RecoverPWPage } from './recover-pw.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecoverPWPageRoutingModule
  ],
  declarations: [RecoverPWPage]
})
export class RecoverPWPageModule {}
