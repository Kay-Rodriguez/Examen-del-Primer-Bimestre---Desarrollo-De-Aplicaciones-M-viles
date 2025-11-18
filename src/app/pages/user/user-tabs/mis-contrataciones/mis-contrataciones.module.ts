import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { MisContratacionesPage } from './mis-contrataciones.page';

const routes: Routes = [
  { path: '', component: MisContratacionesPage }
];

@NgModule({
  declarations: [MisContratacionesPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MisContratacionesPageModule {}
