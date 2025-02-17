import { Component, inject } from '@angular/core';
import { AuthService } from '../../../Authentication/services/auth.service';
import { FeatureRedirectService } from '../../../../core/services/feature-redirect.service';

@Component({
  selector: 'app-cart-page',
  imports: [],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  private readonly featureRedirectService = inject(FeatureRedirectService)
  ngOnInit() {
    this.featureRedirectService.verifyLogin()
  }



}
