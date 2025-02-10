import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainSliderComponent } from "../main-slider/main-slider.component";
import { CategoriesSliderComponent } from "../categories-slider/categories-slider.component";
import { RecommededProductsComponent } from "../recommeded-products/recommeded-products.component";
import { BrandsSliderComponent } from "../brands-slider/brands-slider.component";
import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";
import { HomeProductsComponent } from "../home-products/home-products.component";

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, MainSliderComponent, CategoriesSliderComponent, RecommededProductsComponent, BrandsSliderComponent, ProductCardComponent, HomeProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
