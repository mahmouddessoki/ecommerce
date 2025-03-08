import { Component, HostListener, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { NgxSpinnerComponent } from "ngx-spinner";
import { AuthService } from './features/Authentication/services/auth.service';
import { CartService } from './features/cart/services/cart.service';
import { WishlistService } from './features/wishlist/services/wishlist.service';
import { FooterComponent } from "./shared/components/footer/footer.component";
import { NavbarComponent } from "./shared/components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerComponent, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  sub: any;
  currentRoute: any;
  isScroll:boolean = false

  private readonly auth = inject(AuthService)
  private readonly cartService = inject(CartService)
  private readonly wishService = inject(WishlistService)

  @HostListener('window:scroll') onScroll(){
    if(document.documentElement.scrollTop > 100) {
      this.isScroll = true
    }else {
      this.isScroll = false
    }
  }
  ngOnInit() {
    this.auth.verifyToken().subscribe({
      next: () => {
        this.auth.isLoggedIn.set(true)
        this.getUserCart()
        this.getUserWishList()
      },
      error: () => {
        this.auth.isLoggedIn.set(false)
      }
    })



  }
  scrollTop(){
    scrollTo(0,0)
  }
  getUserCart() {
    this.cartService.getUserCart().subscribe({
      next: (res) => {
        this.cartService.cartCount.set(res.numOfCartItems)
      }
    })



  }

  getUserWishList() {
    // console.log("object");
    this.sub = this.wishService.getUserWishList().subscribe({
      next: (res) => {
        this.wishService.wishCount.set(res.count)
      }
    })
  }
}
