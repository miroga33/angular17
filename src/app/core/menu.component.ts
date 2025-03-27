import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../api/api.service';
import { Category } from '../models/category.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'mike-menu',
  standalone: true,
  imports: [RouterModule],
  template: `
    <aside>
      <nav>
        <ul>
          @for (category of categories(); track category.id) {
            <li>
              <a [routerLink]="['/products', category.name, category.id]">{{
                category.name
              }}</a>
            </li>
          }
          <li><a href="#">Services</a></li>
          <li><a href="#">About</a></li>
        </ul>
      </nav>
    </aside>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  #apiService = inject(ApiService);
  categories: Signal<Category[]> = toSignal(this.getCategories$(), {
    initialValue: [],
  });

  constructor() {}

  getCategories$() {
    return this.#apiService.getCategories();
  }
}
