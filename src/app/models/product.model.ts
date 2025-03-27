export interface Product {
  id: number;
  name: string;
  price: number;
  category_id: number;
  brand: string;
  stock: number;
}

export interface ProductCart extends Product {
  units: number;
}
