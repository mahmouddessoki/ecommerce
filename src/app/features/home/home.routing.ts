import { Routes } from "@angular/router";
import { authResolver } from "../../core/resolvers/auth.resolver";
import { BrandProductsComponent } from "../brands/components/brand-products/brand-products.component";
import { BrandsComponent } from "../brands/components/brands/brands.component";
import { CartPageComponent } from "../cart/components/cart-page/cart-page.component";
import { CategoryProductsComponent } from "../products/components/category-products/category-products.component";
import { ProductDetailsComponent } from "../products/components/product-details/product-details.component";
import { ProductListComponent } from "../products/components/product-list/product-list.component";
import { HomeComponent } from "./components/home/home.component";
import { WishlistComponent } from "../wishlist/components/wishlist/wishlist.component";
import { CategoriesComponent } from "../categories/components/categories/categories.component";
import { OrderListComponent } from "../Order/components/order-list/order-list.component";
import { ProfileComponent } from "../user-profile/components/profile/profile.component";
import { UpdateDataComponent } from "../user-profile/components/update-data/update-data.component";
import { ChangePasswordComponent } from "../user-profile/components/change-password/change-password.component";

export const homeRoutes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'wishlist', component: WishlistComponent, title: 'Wishlist' },
  { path: 'cart', component: CartPageComponent, title: 'Cart' },
  { path: 'products', component: ProductListComponent, title: 'Products' },
  { path: 'brands', component: BrandsComponent, title: 'Brands' },
  { path: 'profile', loadComponent:()=>import('../user-profile/components/profile/profile.component').then(c=>c.ProfileComponent),
    children:[
      {path:'update' , component:UpdateDataComponent},
      {path:'changePw' , component:ChangePasswordComponent},
      { path: '', redirectTo:'update', pathMatch: 'full'},
    ], title: 'Setting' },
  { path: 'cats', component: CategoriesComponent, title: 'Categories' },
  { path: 'allorders', component: OrderListComponent, title: 'Orders' },
  {
    path: 'details/:id',
    // loadComponent: () => import('../products/components/product-details/product-details.component').then(c => ProductDetailsComponent),
    component: ProductDetailsComponent,
    title: 'Details'
  },
  {
    path: 'brand/:id',
    // loadComponent: () => import('../products/components/product-details/product-details.component').then(c => ProductDetailsComponent),
    component: BrandProductsComponent, title: 'Brand'
  },
  {
    path: 'category/:id',
    // loadComponent: () => import('../products/components/category-products/category-products.component').then(c => CategoryProductsComponent),
    component: CategoryProductsComponent,
    title: 'Category'
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }

]
