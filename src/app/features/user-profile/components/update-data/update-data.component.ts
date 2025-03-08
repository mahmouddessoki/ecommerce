import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ValidationMessagesComponent } from '../../../../shared/components/validation-messages/validation-messages.component';
import { InvalidInputDirective } from '../../../../shared/directives/invalid-input.directive';
import { globalValidator } from '../../../../shared/helpers/global-validators';
import { AuthService } from '../../../Authentication/services/auth.service';
import { UserData } from '../../models/user-data';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-update-data',
  imports: [ReactiveFormsModule,ValidationMessagesComponent,InvalidInputDirective],
  templateUrl: './update-data.component.html',
  styleUrl: './update-data.component.css'
})
export class UpdateDataComponent {
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
        name: [null, globalValidator.nameValidate],
        email: [null, globalValidator.emailValidate],
        phone: [null, globalValidator.phoneValidate],
      })
    }





    ngOnInit() {
      // this.sub = redirectToHome(this.authService)
      this.createForm()


    }
    updateInfo() {
      if (this.authForm.invalid || this.isLoading) {
        this.authForm.markAllAsTouched();
        return;
      }

      this.isLoading = true;
      const user = ((this.authForm.value) as unknown) as UserData
      this.sub = this.userService.updateInfo(user).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false;
          this.resMsg = res.message;
          this.toaster.success('', "Info updated successfully,Login again!");
          setTimeout(() => {
            this.auth.logout();
            this.auth.isLoggedIn.set(false)
            this.auth.navigateToLogin()
          },1500)
        },
        error: ({error} ) => {
          // console.log(errors);
          this.resMsg = error.errors.msg
          this.isLoading = false;
        }
      })

    }

    ngOnDestroy() {
      this.sub.unsubscribe()
    }
}
