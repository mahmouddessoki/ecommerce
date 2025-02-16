import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms"
import { AuthService } from '../../services/auth.service';
import { globalValidator } from '../../../../shared/helpers/global-validators';
import { passwordMisMatch } from '../../../../shared/helpers/password-match';
import { RegisterUser } from '../../models/register-user';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { InvalidInputDirective } from '../../../../shared/directives/invalid-input.directive';
import { ValidationMessagesComponent } from "../../../../shared/components/validation-messages/validation-messages.component";
import { ValidationHintComponent } from "../../../../shared/components/validation-hint/validation-hint.component";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, ValidationMessagesComponent, ValidationHintComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder)
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  isLoading: boolean = false;
  resMsg!: string;
  tooltip:boolean = false;

  authForm = this.fb.group({
    name: [null, globalValidator.nameValidate],
    email: [null, globalValidator.emailValidate],
    password: [null, globalValidator.passwordValidate],
    rePassword: ['', Validators.required]
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
      error: ({error}) => {
        this.resMsg= error.message
        this.isLoading = false;
      }
    })
  }



  // get


}
