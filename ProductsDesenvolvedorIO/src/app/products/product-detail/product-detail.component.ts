import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../products.service';
import { Product } from '../../interfaces/product.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: "app-product-detail",
  imports: [CommonModule],
  providers: [ProductsService],
  templateUrl: "./product-detail.component.html",
  styleUrl: "./product-detail.component.css",
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  public product!: Product;
  private subRoutes: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.subRoutes = this.activatedRoute.params.subscribe((params) => {
      this.productsService.getProductById(params["id"]).subscribe({
        next: (product) => this.product = product,
        error: (err) => console.log(err),
      });
    });
  }

  ngOnDestroy(): void {
    this.subRoutes.unsubscribe();
  }
}
