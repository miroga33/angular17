import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
  signal,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ApiService } from '../../api/api.service';
import { Category } from '../../models/category.model';
import { CategoryComponent } from '../../shared/category.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  imports: [CategoryComponent],
  template: `
    <div id="categories-container">
      @for (category of categories(); track category.id) {
        <mike-category [category]="category"></mike-category>
      }
    </div>
  `,
  styles: `
    #categories-container {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      padding: 20px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  // The title service to update the title
  #title = inject(Title);
  // The meta service to update the meta tags
  #meta = inject(Meta);

  #apiService = inject(ApiService);

  categories: Signal<Category[]> = toSignal(this.getCategories$(), {
    initialValue: [],
  });

  constructor() {
    this.#title.setTitle('Deportes Aventura');
    this.#meta.updateTag({
      name: 'description',
      content: 'Tienda de Deportes',
    });
  }

  getCategories$() {
    return this.#apiService.getCategories();
  }
}
