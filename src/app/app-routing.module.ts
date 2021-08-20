import {NgModule} from '@angular/core';
import {RoleGuard} from './shared/guards/role.guard';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './layout/main/main.component';
import {BlankComponent} from './layout/blank/blank.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
    data: {
      roles: 'client|admin|guest'
    },  
  },
  {
    path: 'admin',
    component: MainComponent,
    children: [
      {
        path: 'user-administration',
        loadChildren: () => import('./pages/user-administration/user-administration.module').then(m => m.UserAdministrationModule),
        data: {
          roles: 'client|admin|guest'
        },
        canActivate: [RoleGuard]
      }
    ]
  },
  {
    path: 'authentication',
    component: BlankComponent,
    loadChildren: () => import('./pages/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'common',
    component: BlankComponent,
    loadChildren: () => import('./pages/common/common.module').then(m => m.CommonModule)
  },
  {
    path: 'delivery-administration',
    component: BlankComponent,
    loadChildren:() => import('./pages/delivery-administration/delivery-administration.module').then(m=>m.DeliveryAdministrationModule),
    data: {
      roles: 'admin'
    },
  },
  {
    path: '**',
    redirectTo: '/register'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
