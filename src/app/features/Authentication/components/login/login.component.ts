import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { globalValidator } from '../../../../shared/helpers/global-validators';
import { AuthService } from '../../services/auth.service';
import { LoginUser } from '../../models/login-user';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder)
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  isLoading: boolean = false;
  @Input() accountExist!: boolean;
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();

  authForm = this.fb.group({
    email: [null, globalValidator.emailValidate],
    password: [null, globalValidator.passwordValidate],

  })



  login() {
    console.log(this.authForm);
    if (this.authForm.invalid || this.isLoading) {
      this.authForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const user = ((this.authForm.value) as unknown) as LoginUser
    this.authService.login(user).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        this.router.navigate(['/home'])

        // localStorage.setItem('token', res.token);
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    })
  }

}
