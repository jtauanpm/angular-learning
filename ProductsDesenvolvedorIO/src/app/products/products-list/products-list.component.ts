import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../products.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-list',
  imports: [CommonModule, RouterLink],
  providers: [ProductsService],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
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
      )
  }
}
