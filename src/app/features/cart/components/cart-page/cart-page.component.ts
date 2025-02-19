import { Component, inject } from '@angular/core';
import { AuthService } from '../../../Authentication/services/auth.service';
import { FeatureRedirectService } from '../../../../core/services/feature-redirect.service';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart.interfaces';
import { CartItemComponent } from "../cart-item/cart-item.component";

@Component({
  selector: 'app-cart-page',
  imports: [CartItemComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  private readonly featureRedirectService = inject(FeatureRedirectService)
  private readonly cartService = inject(CartService)
  cartItems: Cart = {} as Cart
  ngOnInit() {
    this.featureRedirectService.verifyLogin()
    this.getUserCart()
  }



  getUserCart() {
    this.cartService.getUserCart().subscribe({
      next: (res) => {
        this.cartItems = res;
        console.log(this.cartItems);
      },
      error: (err) => {
        console.log(err)
      }
    })



  }

}
