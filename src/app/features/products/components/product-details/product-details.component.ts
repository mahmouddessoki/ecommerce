import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from '../../models/iproduct';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  private readonly routes = inject(ActivatedRoute)
  private readonly productsService = inject(ProductsService)
  id!: string | null;
  product: Iproduct = {} as Iproduct;
  activeImgSrc!:string;
  getProductId() {
    this.routes.paramMap.subscribe({
      next: (res) => {
        this.id = res.get('id')
        console.log(this.id);
      }
    })
  }


  getDetails() {
    this.productsService.getProductDetails(this.id as string).subscribe({
      next: ({ data }) => {
        this.product = data
        console.log(this.product);
      }
    })
  }


  activeImg(e: MouseEvent) {
    const target = e.target as HTMLImageElement;
    this.activeImgSrc = target.src;

  }



  ngOnInit(): void {
    this.getProductId();
    this.getDetails();
  }


}
