import { Component, inject, signal, WritableSignal } from '@angular/core';
import { PaginationComponent } from "../../../../shared/components/pagination/pagination.component";
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';
import { CatCardComponent } from "../cat-card/cat-card.component";

@Component({
  selector: 'app-categories',
  imports: [CatCardComponent, PaginationComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  private readonly catService = inject(CategoriesService);
  cats: WritableSignal<Category[]> = signal<Category[]>([]);
  currentPage: number = 1;
  totalPages!: number;
  getCats() {
    this.catService.getCategories(this.currentPage).subscribe({
      next: ({ data, metadata: { numberOfPages } }) => {
        this.cats.set(data);
        this.totalPages = numberOfPages;
        console.log(this.totalPages);
      },
    });
  }

  getPage(e: number) {
    this.currentPage = e;
    this.getCats();
  }

  ngOnInit(): void {
    this.getCats();
  }
}
