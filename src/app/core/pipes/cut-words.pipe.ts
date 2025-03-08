import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutWords'
})
export class CutWordsPipe implements PipeTransform {

  transform(value: string,limit:number): string {
    return value.split(' ' , limit).join(' ');
  }

}
