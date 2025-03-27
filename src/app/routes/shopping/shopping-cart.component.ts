import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { ProductCart } from '../../models/product.model';
import { ShoppingService } from '../../shared/store/shopping.service';

@Component({
  selector: 'mike-shopping-cart',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    @if (items().length === 0) {
      <h2>Shopping Cart is Empty</h2>
    } @else {
      <table>
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Brand</th>
            <th scope="col">Units</th>
            <th scope="col">Price</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          @for (item of items(); track item.id) {
            <tr>
              <th scope="row">{{ item.name }}</th>
              <td>{{ item.brand }}</td>
              <td>{{ item.units }}</td>
              <td>{{ item.price | currency: 'EUR' }}</td>
              <td>
                <button (click)="removeItem(item)">
                  <i class="fas fa-trash-can"></i>
                </button>
              </td>
            </tr>
          }
          <tr>
            <th scope="row"></th>
            <td></td>
            <td></td>
            <td>Total Products:</td>
            <td>
              {{ prizeTotalProducts() | currency: 'EUR' }}
            </td>
          </tr>
          @if (cost() != 0) {
            <tr>
              <th scope="row"></th>
              <td></td>
              <td></td>
              <td>Transport costs</td>
              <td>
                {{ cost() | currency: 'EUR' }}
              </td>
            </tr>
          }
          <tr>
            <th scope="row"></th>
            <td></td>
            <td></td>
            <td>Total</td>
            <td>
              {{ prizeTotal() | currency: 'EUR' }}
            </td>
          </tr>
        </tbody>
      </table>
      <button (click)="buy()">Purchase</button>
    }
  `,
  styles: `
    :host {
      width: 100%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ShoppingCartComponent {
  #shoppingService = inject(ShoppingService);
  items: Signal<ProductCart[]> = this.#shoppingService.state;
  prizeTotalProducts: Signal<number> = this.#shoppingService.prizeTotalProducts;
  prizeTotal: Signal<number> = computed(
    () => this.prizeTotalProducts() + this.cost(),
  );
  cost = computed(() => {
    if (this.#shoppingService.prizeTotalProducts() > 100) {
      return 0;
    } else if (this.#shoppingService.prizeTotalProducts() > 50) {
      return 5;
    } else {
      return 10;
    }
  });

  removeItem(item: ProductCart) {
    this.#shoppingService.removeItem(item);
  }

  buy() {
    this.#shoppingService.clearShoppingCart();
  }
}
