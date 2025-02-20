import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FeatureRedirectService } from '../../../../core/services/feature-redirect.service';
import { Cart } from '../../models/cart.interfaces';
import { CartService } from '../../services/cart.service';
import { CartItemComponent } from "../cart-item/cart-item.component";

@Component({
  selector: 'app-cart-page',
  imports: [CartItemComponent,RouterLink],
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

  removeItem(itemId: string) {
  this.cartService.removeCartItem(itemId).subscribe({
    next: (res) => {
      this.cartItems=res
    },
    error: (err) => {
      console.log(err)
    }
  })
  }

  updateQty(e: { productId: string; count: number; }){
    this.cartService.updateProductQuantity(e.productId,e.count).subscribe({
      next: (res) => {
        this.cartItems=res
      }
    })
  }

  clearCart(){
    this.cartService.clearCart().subscribe({
      next: (res) => {
        if (res.message == "success") {
          this.getUserCart()
        }
      }
    })
  }

}
