import { Component, inject } from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card.component";
import { ProductsService } from '../../services/products.service';
import { Iproduct } from '../../models/iproduct';
import { PaginationComponent } from "../../../../shared/components/pagination/pagination.component";
import { CartService } from '../../../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { addToCart } from '../../../../shared/helpers/operations';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  private readonly productsService = inject(ProductsService)
  private readonly cartService = inject(CartService)
  private readonly toaster = inject(ToastrService)

  products: Iproduct[] = []
  currentPage: number = 1;
  totalPages!: number;
  getProducts() {
    this.productsService.getAllProducts(this.currentPage).subscribe({
      next: ({ data, metadata: { numberOfPages } }) => {
        this.products = data
        this.totalPages = numberOfPages;
      }
    })
  }
  addProductToCart(id: string) {
    addToCart(id,this.cartService,this.toaster)
  }

  ngOnInit(): void {
    this.getProducts()

  }







  getPage(e: number) {
    this.currentPage = e
    this.getProducts()
  }

}
