import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
{
  path: 'welcome',
  loadChildren: () => import('./pages/public/welcome/welcome.module').then(m => m.WelcomePageModule)
},
{
  path: 'catalogo-publico',
  loadChildren: () => import('./pages/public/catalogo-publico/catalogo-publico.module').then(m => m.CatalogoPublicoPageModule)
},
{
  path: 'login',
  loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginPageModule)
},
{
  path: 'register',
  loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterPageModule)
},
{
  path: 'user',
  loadChildren: () => import('./pages/user/user-tabs/user-tabs.module').then(m => m.UserTabsPageModule)
},
{
  path: 'asesor',
  loadChildren: () => import('./pages/asesor/asesor-tabs/asesor-tabs.module').then(m => m.AsesorTabsPageModule),
  canActivate: [AuthGuard]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
