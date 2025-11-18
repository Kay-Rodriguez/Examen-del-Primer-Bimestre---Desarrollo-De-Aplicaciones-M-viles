import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { WelcomePage } from './welcome.page';

@NgModule({
  declarations: [WelcomePage],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: WelcomePage }])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WelcomePageModule {}
