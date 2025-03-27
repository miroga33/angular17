import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  InputSignal,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { map, Observable, startWith, Subject, switchMap } from 'rxjs';
import { ApiService } from '../../api/api.service';
import { Product } from '../../models/product.model';
import { ProductComponent } from '../../shared/product.component';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ShoppingService } from '../../shared/store/shopping.service';

@Component({
  selector: 'mike-products',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  template: `
    <div id="title-category">
      <h2>{{ category() | uppercase }}</h2>
    </div>
    <div id="articles-container">
      @for (product of products(); track product.id) {
        <mike-product [product]="product" (addProduct)="addProduct($event)" />
      }
    </div>
  `,
  styles: `
    #title-category {
      padding-left: 20px;
    }
    #articles-container {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      padding: 20px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  // Title & Meta to SEO
  #title = inject(Title);
  #meta = inject(Meta);

  #apiService = inject(ApiService);

  #shoppingService = inject(ShoppingService);

  // Parameter from URL
  category = input<string>();

  category_id: InputSignal<number | undefined> = input<number>();

  category_id$: Observable<number | undefined> = toObservable(this.category_id);

  private refreshProducts$ = new Subject<void>();

  products$: Observable<Product[]> = this.category_id$.pipe(
    switchMap((id) =>
      this.refreshProducts$.pipe(
        startWith(null),
        switchMap(() => this.getProducts$(id)),
      ),
    ),
  );
  products: Signal<Product[]> = toSignal(this.products$, {
    initialValue: [],
  });

  constructor() {
    effect(() => {
      const title =
        'Deportes Aventura' + ' | ' + this.category()?.toUpperCase();
      this.#title.setTitle(title);
      this.#meta.updateTag({
        name: 'description',
        content: title,
      });
    });
  }

  ngOnInit(): void {}

  getProducts$(id: any) {
    return this.#apiService.getProductsByCategoryId(id);
  }

  addProduct(product: Product) {
    this.#apiService.updateStock(product).subscribe({
      next: () => {
        this.refreshProducts$.next();
        this.#shoppingService.addItem(product);
      },
      error: (err) => {
        console.error('Error updating stock:', err);
      },
    });
  }

  ngOnDestroy(): void {
    // if (this.routeSub) {
    //   this.routeSub.unsubscribe();
    // }
  }
}
