import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from '../../../products/models/iproduct';
import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";
import { PaginationComponent } from "../../../../shared/components/pagination/pagination.component";
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'category-products',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.css'
})
export class CategoryProductsComponent {
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productsService = inject(ProductsService)
  catId!: string | null
  catProds: Iproduct[] = [];
  totalPages!: number;
  currentPage: number = 1
  catName!: string
  getCatId() {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.catId = res.get('id')
        this.getCatProds();

      }
    })
  }

  getCatProds() {
    this.productsService.getSpecificCategoryProds(this.catId as string, 8, this.currentPage).subscribe({
      next: ({ data, metadata: { numberOfPages } }) => {
        this.catProds = data
        this.catName = this.catProds[0].category['name']
        this.totalPages = numberOfPages;
      }
    })
  }

  getPage(e: number) {
    this.currentPage = e
    this.getCatProds()
  }

  ngOnInit(): void {
    this.getCatId();
  }


}
