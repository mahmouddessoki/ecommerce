import { Component, inject } from '@angular/core';
import { Iproduct } from '../../../products/models/iproduct';
import { ProductsService } from '../../../products/services/products.service';
import { BrandCardComponent } from "../../../brands/components/brand-card/brand-card.component";
import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";

@Component({
  selector: 'app-home-products',
  imports: [BrandCardComponent, ProductCardComponent],
  templateUrl: './home-products.component.html',
  styleUrl: './home-products.component.css'
})
export class HomeProductsComponent {
  Products: Iproduct[] = []
  private readonly productsService = inject(ProductsService)

  getProducts() {
    this.productsService.getAllProducts().subscribe({
      next: ({ data }) => {
        this.Products = data.slice(0, 8)
        // console.log(this.Products);
      }
    })
  }

  ngOnInit(): void {
    this.getProducts()
  }
}
