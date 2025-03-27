import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./routes/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'products/:category/:category_id',
    loadComponent: () =>
      import('./routes/products/products.component').then(
        (m) => m.ProductsComponent,
      ),
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./routes/auth/login.component'),
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./routes/auth/register.component'),
  },
  {
    path: 'shopping',
    loadComponent: () => import('./routes/shopping/shopping-cart.component'),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
