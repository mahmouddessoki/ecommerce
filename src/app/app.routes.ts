import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/Layouts/auth-layout/auth-layout.component';
import { UserLayoutComponent } from './core/Layouts/user-layout/user-layout.component';
import { authRoutes } from './features/Authentication/auth.routing';
import { homeRoutes } from './features/home/home.routing';
import { authGuard } from './core/guards/auth.guard';
import { isLoggedInGuard } from './core/guards/is-logged-in.guard';
import { LoginComponent } from './features/Authentication/components/login/login.component';
import { RegisterComponent } from './features/Authentication/components/register/register.component';

export const routes: Routes = [
  {
    path: '', component: UserLayoutComponent
    , children: homeRoutes
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },



];
