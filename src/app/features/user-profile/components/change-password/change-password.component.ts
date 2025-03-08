import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { globalValidator } from '../../../../shared/helpers/global-validators';
import { LoginUser } from '../../../Authentication/models/login-user';
import { UserService } from '../../services/user.service';
import { PassChange } from '../../models/pass-change';
import { passwordMisMatch } from '../../../../shared/helpers/password-match';
import { InvalidInputDirective } from '../../../../shared/directives/invalid-input.directive';
import { ValidationMessagesComponent } from '../../../../shared/components/validation-messages/validation-messages.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../Authentication/services/auth.service';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule,InvalidInputDirective,ValidationMessagesComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

  private readonly fb = inject(FormBuilder)
    private readonly userService = inject(UserService)
    private readonly toaster = inject(ToastrService)
    private readonly auth = inject(AuthService)
    authForm!: FormGroup;
    isLoading: boolean = false;
    // @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
    sub: Subscription = new Subscription()
    resMsg!: string;

    createForm() {
      this.authForm = this.fb.group({
        currentPassword: [null, Validators.required],
        password: [null, globalValidator.passwordValidate],
        rePassword: [null],

      }, { validators: passwordMisMatch })
    }



    ngOnInit() {
      // this.sub = redirectToHome(this.authService)
      this.createForm()


    }
    changePw() {
      console.log(this.authForm);
      if (this.authForm.invalid || this.isLoading) {
        this.authForm.markAllAsTouched();
        this.authForm.get('password')?.setValue("")
        return;
      }

      this.isLoading = true;
      const user = ((this.authForm.value) as unknown) as PassChange
      this.sub = this.userService.changePw(user).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.resMsg = res.message;
          this.toaster.success('', "Password changed successfully Login again");
          this.auth.logout();
          this.auth.isLoggedIn.set(false)
          this.auth.navigateToLogin()
        },
        error: ({ error }) => {
          this.resMsg = error.message
          this.isLoading = false;
        }
      })

    }

    ngOnDestroy() {
      this.sub.unsubscribe()
    }


}
