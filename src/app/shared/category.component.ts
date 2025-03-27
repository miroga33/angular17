import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { Category } from '../models/category.model';
import { RouterModule } from '@angular/router';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'mike-category',
  standalone: true,
  imports: [RouterModule, UpperCasePipe],
  template: `
    <article>
      <header>{{ category().name | uppercase }}</header>
      <p>{{ category().description }}</p>
      <footer>
        <button [routerLink]="['/products', category().name, category().id]">
          Ver más
        </button>
      </footer>
    </article>
  `,
  styles: `
    article {
      max-width: 300px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent {
  category: InputSignal<Category> = input.required<Category>();
}
