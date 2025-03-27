import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  EventEmitter,
  inject,
  input,
  InputSignal,
  Output,
  signal,
} from '@angular/core';
import { Product } from '../models/product.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'mike-product',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  template: `
    <article>
      <header>{{ product().name }}</header>
      <p>Brand: {{ product().brand }}</p>
      @if (outOfStock()) {
        <p>Out of Stock</p>
      } @else {
        <p [ngClass]="stockClass()">Available: {{ product().stock }}</p>
      }
      <p>Price: {{ product().price | currency: 'EUR' }}</p>
      <footer>
        <button (click)="add()" [disabled]="outOfStock()">Añadir cesta</button>
      </footer>
    </article>
  `,
  styles: `
    article {
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    header {
      font-weight: bold;
      font-size: 18px;
    }

    footer {
      color: #888;
      font-size: 14px;
      margin-top: 10px;
    }
    .lastUnit {
      color: red;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
  product = input.required<Product>();
  @Output() addProduct = new EventEmitter<Product>();

  constructor() {}
  outOfStock = computed(() => this.product().stock === 0);
  stockClass = computed(() => {
    if (this.product().stock === 1) {
      return 'lastUnit';
    } else {
      return '';
    }
  });

  add() {
    let productClone = this.product();
    productClone = {
      ...this.product(),
      stock: this.product().stock - 1,
    };
    this.addProduct.emit(productClone);
  }
}
