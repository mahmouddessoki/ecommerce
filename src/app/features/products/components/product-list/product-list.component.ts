import { JsonPipe, KeyValuePipe, PercentPipe } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PaginationComponent } from "../../../../shared/components/pagination/pagination.component";
import { addToCart, addToWish } from '../../../../shared/helpers/operations';
import { AuthService } from '../../../Authentication/services/auth.service';
import { CartService } from '../../../cart/services/cart.service';
import { WishlistService } from '../../../wishlist/services/wishlist.service';
import { Iproduct } from '../../models/iproduct';
import { ProductsService } from '../../services/products.service';
import { ProductCardComponent } from "../product-card/product-card.component";
import { SearchPipe } from '../../../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, PaginationComponent,SearchPipe,FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  private readonly productsService = inject(ProductsService)
  private readonly cartService = inject(CartService)
  private readonly wishService = inject(WishlistService)
  private readonly auth = inject(AuthService)
  private readonly toaster = inject(ToastrService)
  private readonly activatedRoute = inject(ActivatedRoute)

  sub: any
  products: WritableSignal<Iproduct[]> = signal<Iproduct[]>([])

  currentPage: number = 1;
  totalPages!: number;
  searchValue: string =''
  currentRoute: string;
  // apiResponse!:Observable<any>;


  constructor() {
    this.currentRoute = this.activatedRoute.snapshot.url.map(segment => segment.path).join('/');
    console.log('Current Route:', this.currentRoute);
  }
  getProducts() {
    this.sub = this.productsService.getAllProducts(this.currentPage).subscribe({
      next: ({ data, metadata: { numberOfPages } }) => {
        this.products.set(data)
        this.totalPages = numberOfPages;
      }
    })
  }
  addProductToCart(id: string) {
    this.auth.verifyToken().subscribe({
      next: (res) => {
        this.sub = addToCart(id, this.toaster, this.cartService)

      }, error: (err) => {
        this.toaster.info('Please login to add products to cart')

      }
    })
  }
  addProductToWish(id: string) {
    this.auth.verifyToken().subscribe({
      next: (res) => {

        this.sub = addToWish(id, this.toaster, this.wishService)

      },
      error: (err) => {
        this.toaster.info('Please login to add products to wishlist')

      }
    })
  }

  ngOnInit(): void {
    this.getProducts()

  }








  getPage(e: number) {
    this.currentPage = e
    this.getProducts()
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }

}
