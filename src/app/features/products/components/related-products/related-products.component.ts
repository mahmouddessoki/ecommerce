import { Component, inject, Input } from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card.component";
import { Iproduct } from '../../models/iproduct';
import { CartService } from '../../../cart/services/cart.service';
import { addToCart } from '../../../../shared/helpers/operations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-related-products',
  imports: [ProductCardComponent],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.css'
})
export class RelatedProductsComponent {
  @Input() relatedProds: Iproduct[] = []
  private readonly cartService = inject(CartService)
  private readonly toaster = inject(ToastrService)

  addProductToCart(id: string) {
   addToCart(id,this.cartService,this.toaster)
  }
}
