import { Pipe, PipeTransform } from '@angular/core';
import { Iproduct } from '../../features/products/models/iproduct';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: Iproduct[], keyword: string): Iproduct[] {
    return products.filter((obj)=>{
      return obj.title.toLowerCase().includes(keyword.toLowerCase());
    });
  }

}
