import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShoppingService } from '../shared/store/shopping.service';

@Component({
  selector: 'mike-header',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header>
      <nav id="loginMenu">
        <ul>
          <li><a [routerLink]="['/auth', 'register']">Register</a></li>
          <li><a [routerLink]="['/auth', 'login']">Login</a></li>
          <li>
            <a [routerLink]="['/shopping']">
              <i class="fas fa-shopping-cart"></i
            ></a>
            <span>{{ countItems() }}</span>
          </li>
        </ul>
      </nav>
      <hgroup routerLink="/home">
        <h1>DEPORTES AVENTURA</h1>
        <p>Tu tienda de confianza</p>
      </hgroup>
    </header>
  `,
  styles: `
    header {
      padding: 20px;
      & hgroup {
        cursor: pointer;
      }
    }
    #loginMenu {
      float: right;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  countItems = inject(ShoppingService).countItems;
}
