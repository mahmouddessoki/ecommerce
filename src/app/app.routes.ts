import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/Layouts/auth-layout/auth-layout.component';
import { UserLayoutComponent } from './core/Layouts/user-layout/user-layout.component';
import { authRoutes } from './features/Authentication/auth.routing';
import { homeRoutes } from './features/home/home.routing';

export const routes: Routes = [


  {
    path: '', component: AuthLayoutComponent,
    children: authRoutes
  },
  {
    path: '', component: UserLayoutComponent
    , children: homeRoutes
  },


];
