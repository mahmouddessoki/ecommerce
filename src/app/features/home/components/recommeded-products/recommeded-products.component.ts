import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../products/services/products.service';
import { Iproduct } from '../../../products/models/iproduct';
import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";

@Component({
  selector: 'app-recommeded-products',
  imports: [ProductCardComponent],
  templateUrl: './recommeded-products.component.html',
  styleUrl: './recommeded-products.component.css'
})
export class RecommededProductsComponent implements OnInit {
  recomendedProducts: Iproduct[] = []
  private readonly productsService = inject(ProductsService)

  getRecom() {
    this.productsService.getRecommendedProducts().subscribe({
      next:({data})=>{
        this.recomendedProducts = data
        console.log(this.recomendedProducts);
      }
    })
  }

  ngOnInit(): void {
    this.getRecom()
  }


}
