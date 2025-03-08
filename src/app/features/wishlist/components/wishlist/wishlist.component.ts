import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { redirectToLogin } from '../../../../shared/helpers/redirect';
import { AuthService } from '../../../Authentication/services/auth.service';
import { CartService } from '../../../cart/services/cart.service';
import { Wish } from '../../models/wish.model';
import { WishlistService } from '../../services/wishlist.service';
import { EmptyWishComponent } from "../empty-wish/empty-wish.component";
import { WishlistCardComponent } from "../wishlist-card/wishlist-card.component";

@Component({
  selector: 'app-wishlist',
  imports: [WishlistCardComponent, EmptyWishComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {

  private readonly wishService = inject(WishlistService)
  private readonly toatser = inject(ToastrService)
  private readonly auth = inject(AuthService)
  private readonly cartService = inject(CartService)
  sub!: Subscription;
  wishItems: Wish = {} as Wish

  ngOnInit() {
    this.sub = redirectToLogin(this.auth,'wishlist')

    this.getUserWishList();
  }
  getUserWishList() {
    // console.log("object");
    this.sub = this.wishService.getUserWishList().subscribe({
      next: (res) => {
        this.wishItems = res
        this.wishService.wishCount.set(res.count)

      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  removeItem(itemId: string) {
    this.wishService.removeWishItem(itemId).subscribe({
      next: (res) => {
        this.wishService.wishCount.set(res.data.length)
        this.getUserWishList()
        this.toatser.info("Removed From Wish List", '')
        localStorage.removeItem(itemId+'fa')
      }
    })
  }

  addProductToCart(id: string) {
    this.sub = this.cartService.addProduct(id).subscribe({
      next: (res) => {
        this.toatser.success('Product added to cart successfully', '')
        this.cartService.cartCount.set(res.numOfCartItems)
        this.removeItem(id)
        localStorage.removeItem(id + 'fa')


      }
    })
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
