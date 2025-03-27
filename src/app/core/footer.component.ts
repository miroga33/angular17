import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mike-footer',
  standalone: true,
  imports: [],
  template: `
    <footer class="">
      <p>© 2025 Miguel Rodríguez</p>
    </footer>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
