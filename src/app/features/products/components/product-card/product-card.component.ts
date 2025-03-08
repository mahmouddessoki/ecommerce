import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Iproduct } from '../../models/iproduct';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { CutWordsPipe } from '../../../../core/pipes/cut-words.pipe';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink,CurrencyPipe,TitleCasePipe,CutWordsPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input() product: Iproduct = {} as Iproduct;
  @Output() addToCart = new EventEmitter<string>();
  @Output() addToWish = new EventEmitter<string>();
  d = new Date()

  onAddToCart() {
    this.addToCart.emit(this.product._id);
  }
  onAddToWish() {
    this.addToWish.emit(this.product._id);
  }


  isAddedToCart(id:string){
    if(localStorage.getItem(id+'ad')=="added") {
      return true;
    }
    return false;
  }
  isAddedToWIsh(id:string){
    if(localStorage.getItem(id+'fa') == "fav") {
      return true;
    }
    return false;
  }


}
