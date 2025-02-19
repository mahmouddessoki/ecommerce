import { Component, inject, Input } from '@angular/core';
import { Iproduct } from '../../../products/models/iproduct';
import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { customOptions } from '../../../../shared/helpers/owl.options';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../../products/services/products.service';
import { CartService } from '../../../cart/services/cart.service';
import { addToCart } from '../../../../shared/helpers/operations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'specific-category-products',
  imports: [ProductCardComponent, CarouselModule, RouterLink],
  templateUrl: './specific-category-products.component.html',
  styleUrl: './specific-category-products.component.css'
})
export class SpecificCategoryProductsComponent {
  private readonly cartService = inject(CartService)
  private readonly productsService = inject(ProductsService)
  private readonly toaster = inject(ToastrService)
  @Input() catId!: string;
  catName!: string

  customOptions: any = customOptions



  catProducts: Iproduct[] = [];
  getCatProds() {
    this.productsService.getSpecificCategoryProds(this.catId).subscribe({
      next: ({ data }) => {
        this.catProducts = data
        this.catName = data[0]?.category?.name

      }
    })
  }

  addProductToCart(id: string) {
    addToCart(id,this.cartService,this.toaster)
  }
  ngOnInit(): void {
    this.getCatProds();
  }


}
