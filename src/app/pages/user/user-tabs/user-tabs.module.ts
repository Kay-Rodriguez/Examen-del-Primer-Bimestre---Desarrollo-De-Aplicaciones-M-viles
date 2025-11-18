import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserTabsPageRoutingModule } from './user-tabs-routing.module';

import { UserTabsPage } from './user-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserTabsPageRoutingModule
  ],
  declarations: [UserTabsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserTabsPageModule {}
