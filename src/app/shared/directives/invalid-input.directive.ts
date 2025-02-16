import { Directive, ElementRef, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appInvalidInput]'
})
export class InvalidInputDirective {
  @Input() touched!:boolean;
  @Input() errors!:any;
  @Input() dirty:boolean=false;
  constructor(private el:ElementRef) { }

  ngAfterViewInit() {
    // console.log(this.formCName , this.formG,this.placeholder , this.type);
    console.log(this.dirty);
    // if(this.)

  }

}
