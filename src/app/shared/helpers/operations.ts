import { ToastrService } from "ngx-toastr";
import { CartService } from "../../features/cart/services/cart.service";
import { showToaster } from "./toaster";
import { WishlistService } from "../../features/wishlist/services/wishlist.service";

export const addToCart = (id: string,
  toaster: ToastrService,
  cartService: CartService): any => {


  return cartService.addProduct(id).subscribe({
    next: (res: any) => {
      cartService.cartCount.set(res.numOfCartItems)
      showToaster("Product Added Successfully To Cart", toaster)
      localStorage.setItem(id+'ad','added')

    }
  })


}
export const addToWish = (id: string,
  toaster: ToastrService,
  wishService: WishlistService): any => {

  return wishService.addProduct(id).subscribe({
    next: (res: any) => {
      wishService.wishCount.set(res.data.length)
      showToaster("Product Added Successfully To Wishlist", toaster)
      localStorage.setItem(id+'fa', 'fav')

    }
  })


}





