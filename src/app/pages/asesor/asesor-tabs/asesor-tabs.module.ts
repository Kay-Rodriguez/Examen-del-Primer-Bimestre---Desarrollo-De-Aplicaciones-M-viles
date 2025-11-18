import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { AsesorTabsPageRoutingModule } from './asesor-tabs-routing.module';
import { AsesorTabsPage } from './asesor-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    AsesorTabsPageRoutingModule
  ],
  declarations: [AsesorTabsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]    // ⬅⬅ OBLIGATORIO PARA ion-tabs
})
export class AsesorTabsPageModule {}
