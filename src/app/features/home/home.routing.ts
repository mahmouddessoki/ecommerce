import { Routes } from "@angular/router";
import { CartPageComponent } from "../cart/components/cart-page/cart-page.component";
import { HomeComponent } from "./components/home/home.component";
import { WishlistComponent } from "../products/components/wishlist/wishlist.component";
import { ProductDetailsComponent } from "../products/components/product-details/product-details.component";

export const homeRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'cart', component: CartPageComponent },
  {path:'details/:id',component:ProductDetailsComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }

]
