import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: "app-product-card",
  imports: [CommonModule, RouterLink],
  templateUrl: "./product-card.component.html",
})
export class ProductCardComponent {
  product = input.required<Product>();
  status = output<Product>();

  emitProduct(){
    this.status.emit(this.product());
  }
}
