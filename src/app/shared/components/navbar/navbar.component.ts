import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../features/Authentication/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() layout!: string;
  private authService = inject(AuthService)
  isAuthenticated: boolean = false;
  ngOnInit() {
    this.verifyLogin()

  }
  verifyLogin() {

    this.authService.verifyToken().subscribe({
      next: (res) => {
        this.isAuthenticated = true;
      },
      error: (err) => {
        this.isAuthenticated = false;

      }
    })
  }



  logout() {
    this.authService.logout()
    this.isAuthenticated = false;
  }





}
