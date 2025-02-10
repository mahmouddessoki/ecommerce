import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../categories/services/categories.service';
import { Category } from '../../../categories/models/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-categories-slider',
  imports: [CarouselModule],
  templateUrl: './categories-slider.component.html',
  styleUrl: './categories-slider.component.css'
})
export class CategoriesSliderComponent implements OnInit {
  categories: Category[] = [];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    autoplay:true,
    autoplayTimeout: 3000,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }
  constructor(private categoriesService: CategoriesService) { }

  getCats() {
    this.categoriesService.getCategories().subscribe({
      next: ({ data }) => {
        this.categories = data
        console.log(this.categories);
      }
    })
  }

ngOnInit(): void {
  this.getCats();
}

}
