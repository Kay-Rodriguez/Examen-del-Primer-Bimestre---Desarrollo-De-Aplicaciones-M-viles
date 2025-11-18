import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsesorTabsPage } from './asesor-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: AsesorTabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'solicitudes',
        loadChildren: () => import('./solicitudes/solicitudes.module').then(m => m.SolicitudesPageModule)
      },
      {
        path: 'chats',
        loadChildren: () => import('./chats/chats.module').then(m => m.ChatsAsesorPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsesorTabsPageRoutingModule {}
