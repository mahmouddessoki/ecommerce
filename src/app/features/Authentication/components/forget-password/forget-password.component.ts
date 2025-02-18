import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forget-password',
  imports: [RouterLink, FormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  private authService=inject(AuthService);
  private router=inject(Router);
  resMsg!:string
  userEmail: string = '';
  getCode(forgetForm: NgForm) {
    console.log("test");
    if (forgetForm.valid) {
      const email: string = forgetForm.value.email
      this.authService?.forgetPasswordCode(email).subscribe({
        next: (res) => {
          if (res.statusMsg == "success") {
            this.router.navigate(['/resetPassword'])
          }
        },
        error: ({error}) => {
          this.resMsg=error.message;
          console.log(this.resMsg);
        }
      })

    }
  }
}
