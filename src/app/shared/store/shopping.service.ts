import {
  computed,
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { LocalRepository } from '../services/localRepository.service';
import { Product, ProductCart } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  #localRepository = inject(LocalRepository);
  #shoppingCartState: WritableSignal<ProductCart[]> = signal([]);

  state: Signal<ProductCart[]> = this.#shoppingCartState.asReadonly();

  countItems = computed(() => {
    let units = 0;
    this.state().forEach((i) => {
      units += i.units;
    });
    return units;
  });

  prizeTotalProducts = computed(() => {
    let total = 0;
    this.state().forEach((i) => {
      total += i.price;
    });
    return total;
  });

  constructor() {
    this.initializeCart();
  }

  initializeCart() {
    this.#shoppingCartState.set(this.#localRepository.load('cart', []));
  }

  addItem(product: Product) {
    this.#shoppingCartState.update((items: ProductCart[]) => {
      const existingProductIndex = items.findIndex(
        (item) => item.id === product.id,
      );

      if (existingProductIndex !== -1) {
        // Incrementar units si el producto ya existe
        const updatedItems = items.map((item, index) => {
          if (index === existingProductIndex) {
            return { ...item, units: item.units + 1 };
          }
          return item;
        });
        return updatedItems;
      } else {
        // Añadir el producto con units = 1 si no existe
        return [...items, { ...product, units: 1 }];
      }
    });

    console.log('Item added', this.state());
    this.#localRepository.save('cart', this.#shoppingCartState());
  }

  removeItem(product: Product) {
    this.#shoppingCartState.update((items: ProductCart[]) => {
      const existingProductIndex = items.findIndex(
        (item) => item.id === product.id,
      );

      if (existingProductIndex !== -1) {
        const existingProduct = items[existingProductIndex];

        if (existingProduct.units > 1) {
          // Decrementar units si units > 1
          const updatedItems = items.map((item, index) => {
            if (index === existingProductIndex) {
              return { ...item, units: item.units - 1 };
            }
            return item;
          });
          return updatedItems;
        } else {
          // Eliminar el producto si units <= 1
          return items.filter((item) => item.id !== product.id);
        }
      } else {
        // Producto no encontrado, no hacer nada (o manejar error si es necesario)
        return items;
      }
    });

    this.#localRepository.save('cart', this.#shoppingCartState());
  }

  clearShoppingCart() {
    this.#localRepository.save('cart', []);
    this.initializeCart();
  }
}
