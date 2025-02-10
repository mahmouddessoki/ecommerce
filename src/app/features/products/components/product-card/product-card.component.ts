import { Component, Input } from '@angular/core';
import { Iproduct } from '../../models/iproduct';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input() product: Iproduct = {} as Iproduct;

}
