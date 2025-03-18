import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../products.interface';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products-list',
  imports: [CommonModule, ProductCardComponent],
  providers: [ProductsService],
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit {
  public products: Product[] = [];

  constructor(private productsService: ProductsService) {  }

  ngOnInit(): void {
    this.productsService.getProducts()
      .subscribe(
        {
          next: products => this.products = products,
          error: err => console.log(err)
        }
      );
  }
}
