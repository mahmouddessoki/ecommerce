import { Component, inject } from '@angular/core';
import { Iproduct } from '../../../products/models/iproduct';
import { ProductsService } from '../../../products/services/products.service';
import { BrandCardComponent } from "../../../brands/components/brand-card/brand-card.component";
import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";
import { RouterLink } from '@angular/router';
import { CartService } from '../../../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { addToCart } from '../../../../shared/helpers/operations';

@Component({
  selector: 'app-home-products',
  imports: [ProductCardComponent,RouterLink],
  templateUrl: './home-products.component.html',
  styleUrl: './home-products.component.css'
})
export class HomeProductsComponent {
  Products: Iproduct[] = []
  private readonly productsService = inject(ProductsService)
  private readonly cartService = inject(CartService)
  private readonly toaster = inject(ToastrService)

  getProducts() {
    this.productsService.getAllProducts(1).subscribe({
      next: ({ data }) => {
        this.Products = data.slice(0, 8)
        // console.log(this.Products);
      }
    })
  }

  addProductToCart(id:string){
    addToCart(id,this.cartService,this.toaster)
  }

  ngOnInit(): void {
    this.getProducts()
  }
}
