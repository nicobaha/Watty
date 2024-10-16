import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsOldPageRoutingModule } from './tabs-old-routing.module';

import { TabsOldPage } from './tabs-old.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsOldPageRoutingModule
  ],
  declarations: [TabsOldPage]
})
export class TabsOldPageModule {}
