import { Component, Input } from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card.component";
import { Iproduct } from '../../models/iproduct';

@Component({
  selector: 'app-related-products',
  imports: [ProductCardComponent],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.css'
})
export class RelatedProductsComponent {
  @Input() relatedProds: Iproduct[] = []
  

}
