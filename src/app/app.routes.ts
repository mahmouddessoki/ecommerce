import { Routes } from '@angular/router';
import { UserLayoutComponent } from './core/Layouts/user-layout/user-layout.component';
import { ForgetPasswordComponent } from './features/Authentication/components/forget-password/forget-password.component';
import { LoginComponent } from './features/Authentication/components/login/login.component';
import { RegisterComponent } from './features/Authentication/components/register/register.component';
import { ResetPasswordComponent } from './features/Authentication/components/reset-password/reset-password.component';
import { homeRoutes } from './features/home/home.routing';

export const routes: Routes = [
  {
    path: '', component: UserLayoutComponent
    , children: homeRoutes
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },



];
