import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CatalogoPublicoPage } from './catalogo-publico.page';

@NgModule({
  declarations: [CatalogoPublicoPage],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,   // 👈 NECESARIO PARA ngModel
    RouterModule.forChild([{ path: '', component: CatalogoPublicoPage }])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CatalogoPublicoPageModule {}
