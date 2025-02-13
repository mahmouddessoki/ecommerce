import { Component, inject, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from "@angular/forms"
import { AuthService } from '../../services/auth.service';
import { globalValidator } from '../../../../shared/helpers/global-validators';
import { passwordMisMatch } from '../../../../shared/helpers/password-match';
import { RegisterUser } from '../../models/register-user';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder)
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  isLoading: boolean = false;
  resMsg!: string;

  authForm = this.fb.group({
    name: [null, globalValidator.nameValidate],
    email: [null, globalValidator.emailValidate],
    password: [null, globalValidator.passwordValidate],
    rePassword: ['']
  }, { validators: [passwordMisMatch] })



  register() {
    console.log(this.authForm);
    if (this.authForm.invalid || this.isLoading) {
      this.authForm.markAllAsTouched();
      this.authForm.get('rePassword')?.setValue("")
      return;
    }

    this.isLoading = true;
    const user = ((this.authForm.value) as unknown) as RegisterUser
    this.authService.register(user).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.router.navigate(['/login'])
      },
      error: (err) => {
        this.isLoading = false;
      }
    })
  }


}
