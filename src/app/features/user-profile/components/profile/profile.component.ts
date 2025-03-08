import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { redirectToLogin } from '../../../../shared/helpers/redirect';
import { AuthService } from '../../../Authentication/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [RouterLink,RouterOutlet,RouterLinkActive],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

    private readonly auth = inject(AuthService)
    sub=new Subscription();

  ngOnInit() {
        this.sub = redirectToLogin(this.auth, 'profile')

  }

}
