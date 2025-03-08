import { Component, computed, inject, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../features/Authentication/services/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { WishlistService } from '../../../features/wishlist/services/wishlist.service';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private authService = inject(AuthService)
  private cartService = inject(CartService)
  private wishService = inject(WishlistService)
  private translateService = inject(TranslationService)
  isAuthenticated: Signal<boolean> = computed(()=>this.authService.isLoggedIn());
  cartItemsCount: Signal<number> = computed(()=>this.cartService.cartCount())
  wishItemsCount: Signal<number> = computed(() => this.wishService.wishCount());
  lang!: string;
  langIsSelected: boolean = false;
  userData:any;

  // isAuth() {
  //   this.authService.isLoggedIn.subscribe({
  //     next: (value) => {
  //       this.isAuthenticated = value
  //     }
  //   });
  // }

  selectedLang(lang: string, dropdown: HTMLDivElement) {
    this.translateService.changeLang(lang)
    this.lang = lang;
    this.langIsSelected = true;
    // dropdown.style.display = 'none';
  }
  ngOnInit() {
    this.getUserData()
    if(typeof localStorage !=="undefined") {
      this.lang = localStorage.getItem('lang') || 'en';
    }



  }


  getUserData(){
    this.userData = this.authService.getUserData();
  }






  logout() {
    this.authService.logout()
    this.authService.isLoggedIn.set(false)
    this.authService.navigateToLogin()
  }





}
