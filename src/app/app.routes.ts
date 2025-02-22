import { Routes } from '@angular/router';
import { UserLayoutComponent } from './core/Layouts/user-layout/user-layout.component';
import { ForgetPasswordComponent } from './features/Authentication/components/forget-password/forget-password.component';
import { LoginComponent } from './features/Authentication/components/login/login.component';
import { RegisterComponent } from './features/Authentication/components/register/register.component';
import { ResetPasswordComponent } from './features/Authentication/components/reset-password/reset-password.component';
import { homeRoutes } from './features/home/home.routing';
import { VerifyCodeComponent } from './features/Authentication/components/verify-code/verify-code.component';
import { CheckoutComponent } from './features/Order/components/checkout/checkout.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '', component: UserLayoutComponent
    , children: homeRoutes
  },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  {
    path: 'forgetPassword',
    loadComponent: () => import('./features/Authentication/components/forget-password/forget-password.component').then(c => ForgetPasswordComponent),
    component: ForgetPasswordComponent,
    title: 'Forget Password'
  },
  {
    path: 'resetPassword',
    loadComponent: () => import('./features/Authentication/components/reset-password/reset-password.component').then(c => ResetPasswordComponent),

    component: ResetPasswordComponent,
    title: 'Reset Password'
  },
  {
    path: 'verify',
    loadComponent: () => import('./features/Authentication/components/verify-code/verify-code.component').then(c => VerifyCodeComponent),

    component: VerifyCodeComponent,
    title: 'Verify Code'
  },
  { path: 'checkout/:id', component: CheckoutComponent, title: 'Checkout' },
  {
    path: '**',
    component: NotFoundComponent
  }


];
