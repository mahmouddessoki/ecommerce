import { Routes } from "@angular/router";
import { CartPageComponent } from "../cart/components/cart-page/cart-page.component";
import { HomeComponent } from "./components/home/home.component";
import { WishlistComponent } from "../products/components/wishlist/wishlist.component";
import { ProductDetailsComponent } from "../products/components/product-details/product-details.component";
import { ProductListComponent } from "../products/components/product-list/product-list.component";
import { BrandsComponent } from "../brands/components/brands/brands.component";
import { CategoryProductsComponent } from "../products/components/category-products/category-products.component";
import { BrandProductsComponent } from "../brands/components/brand-products/brand-products.component";

export const homeRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'brands', component: BrandsComponent },
  { path: 'details/:id', component: ProductDetailsComponent },
  { path: 'brand/:id', component: BrandProductsComponent },
  { path: 'category/:id', component: CategoryProductsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }

]
