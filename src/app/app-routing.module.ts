import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'accounts',
    loadChildren: () => import('./pages/accounts/accounts.module').then( m => m.AccountsPageModule)
  },
  {
    path: 'movements',
    loadChildren: () => import('./pages/movements/movements.module').then( m => m.MovementsPageModule)
  },
  {
    path: 'create-movement',
    loadChildren: () => import('./pages/create-movement/create-movement.module').then( m => m.CreateMovementPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'create-account',
    loadChildren: () => import('./pages/create-account/create-account.module').then( m => m.CreateAccountPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'update-movement',
    loadChildren: () => import('./pages/update-movement/update-movement.module').then( m => m.UpdateMovementPageModule)
  },
  {
    path: 'update-account',
    loadChildren: () => import('./pages/update-account/update-account.module').then( m => m.UpdateAccountPageModule)
  },
  {
    path: 'delete-movement',
    loadChildren: () => import('./pages/delete-movement/delete-movement.module').then( m => m.DeleteMovementPageModule)
  },
  {
    path: 'delete-account',
    loadChildren: () => import('./pages/delete-account/delete-account.module').then( m => m.DeleteAccountPageModule)
  },
  {
    path: 'apirest',
    loadChildren: () => import('./pages/apirest/apirest.module').then( m => m.ApirestPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then( m => m.NotFoundPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
