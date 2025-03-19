import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../products.interface';

@Component({
  selector: "app-product-card",
  imports: [CommonModule, RouterLink],
  templateUrl: "./product-card.component.html",
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() status: EventEmitter<Product> = new EventEmitter();

  emitProduct(){
    this.status.emit(this.product);
  }
}
