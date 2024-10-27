import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HogarModalPageRoutingModule } from './hogar-modal-routing.module';

import { HogarModalPage } from './hogar-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HogarModalPageRoutingModule
  ],
  declarations: [HogarModalPage]
})
export class HogarModalPageModule {}
