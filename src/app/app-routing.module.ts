import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate:[authGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate:[authGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),
    canActivate:[authGuard]
  },
  {
    path: 'recover-pw',
    loadChildren: () => import('./recover-pw/recover-pw.module').then( m => m.RecoverPWPageModule),
    canActivate:[authGuard]
  },
  {
    path: 'tabs-old',
    loadChildren: () => import('./tabs-old/tabs-old.module').then( m => m.TabsOldPageModule),
    canActivate:[authGuard]
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./tutorial/tutorial.module').then( m => m.TutorialPageModule),
    canActivate:[authGuard]
  },
  {
    path: 'ambiente',
    loadChildren: () => import('./ambiente/ambiente.module').then( m => m.AmbientePageModule),
    canActivate:[authGuard]
  },
  {
    path: 'detalle-ambiente',
    loadChildren: () => import('./detalle-ambiente/detalle-ambiente.module').then( m => m.DetalleAmbientePageModule),
    canActivate:[authGuard]
  },
  {
    path: '**',
    loadChildren: () => import('./e404/e404.module').then( m => m.E404PageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
