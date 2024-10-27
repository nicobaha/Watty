import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmbienteModalPageRoutingModule } from './ambiente-modal-routing.module';

import { AmbienteModalPage } from './ambiente-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmbienteModalPageRoutingModule
  ],
  declarations: [AmbienteModalPage]
})
export class AmbienteModalPageModule {}
