import { ToastrService } from "ngx-toastr";
import { CartService } from "../../features/cart/services/cart.service";
import { showToaster } from "./toaster";

export const addToCart = (id: string,
  cartService: CartService,
  toaster: ToastrService) => {

  let subscription = cartService.addProduct(id).subscribe({
    next: (res: any) => {
      showToaster(res.message, toaster)
      subscription.unsubscribe()
    },
    error: (err: any) => {
      console.error(err);
      subscription.unsubscribe()

    }
  })
}
