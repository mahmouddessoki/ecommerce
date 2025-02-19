import { Component, Input } from '@angular/core';
import { Product } from '../../models/cart.interfaces';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {

  @Input() cartItem: Product = {} as Product;


}
