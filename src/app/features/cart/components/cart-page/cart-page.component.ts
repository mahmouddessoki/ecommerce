import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cart } from '../../models/cart.interfaces';
import { CartService } from '../../services/cart.service';
import { CartItemComponent } from "../cart-item/cart-item.component";
import { redirectToLogin } from '../../../../shared/helpers/redirect';
import { AuthService } from '../../../Authentication/services/auth.service';
import { Subscription } from 'rxjs';
import { CartEmptyComponent } from "../cart-empty/cart-empty.component";
import { addToWish } from '../../../../shared/helpers/operations';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../wishlist/services/wishlist.service';

@Component({
  selector: 'app-cart-page',
  imports: [CartItemComponent, RouterLink, CartEmptyComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  private readonly cartService = inject(CartService)
  private readonly auth = inject(AuthService)
  private readonly toaster = inject(ToastrService)
  private readonly wish = inject(WishlistService)
  cartItems: Cart = {} as Cart
  currentRoute!:string
  sub= new Subscription()
  ngOnInit() {
    this.sub = redirectToLogin(this.auth,'cart')
    this.getUserCart()
  }



  getUserCart() {
    this.cartService.getUserCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartItems = res;
      }
    })



  }

  removeItem(itemId: string) {
    this.cartService.removeCartItem(itemId).subscribe({
      next: (res) => {
        this.cartService.cartCount.set(res.numOfCartItems)
        this.cartItems = res
        if (typeof localStorage !== "undefined") {
          localStorage.removeItem(itemId+'ad')
        }

      }
    })
  }

  updateQty(e: { productId: string; count: number; }) {
    this.cartService.updateProductQuantity(e.productId, e.count).subscribe({
      next: (res) => {
        this.cartItems = res
      }
    })
  }
  addToFav(e:string){
    addToWish(e,this.toaster,this.wish)
  }

  clearCart() {
    this.cartService.clearCart().subscribe({
      next: (res) => {
        if (res.message == "success") {
          this.getUserCart()
          this.cartService.cartCount.set(0)
          if (typeof localStorage !== "undefined") {
            let i = 0
            while(localStorage.getItem(this.cartItems.data.products[i].product.id)){
              localStorage.removeItem(this.cartItems.data.products[i].product.id+'ad')
              i++
            }
          }
        }
      }
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

}
