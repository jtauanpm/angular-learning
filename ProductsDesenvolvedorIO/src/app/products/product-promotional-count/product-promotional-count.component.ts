import { Component, input, Input } from '@angular/core';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: "app-product-promotional-count",
  imports: [],
  template: `
    <div>
      <div>
        Quantidade de produtos em promoção: {{ countPromotionalProducts() }} de
        um total de {{ products.length }}
      </div>
    </div>
  `,
})
export class ProductPromotionalCountComponent {
  products = input.required<Product[]>();

  countPromotionalProducts(): number {
    if (!this.products()) return 0;

    return this.products().filter((product) => product.promotional).length;
  }
}
