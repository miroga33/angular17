import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly apiUrl = 'http://localhost:3000';
  #http: HttpClient = inject(HttpClient);
  constructor() {}

  getAllProducts(): Observable<Product[]> {
    return this.#http.get<Product[]>(this.apiUrl + '/products');
  }

  getProductsByCategoryId(
    categoryId: number | undefined,
  ): Observable<Product[]> {
    return this.#http
      .get<Product[]>(this.apiUrl + '/products')
      .pipe(
        map((products: Product[]) =>
          products.filter((p) => p.category_id == categoryId),
        ),
      );
  }

  updateStock(product: Product) {
    return this.#http.put<Product>(
      this.apiUrl + '/products/' + product.id,
      product,
    );
  }

  getCategories(): Observable<Category[]> {
    return this.#http.get<Category[]>(this.apiUrl + '/categories');
  }
}
