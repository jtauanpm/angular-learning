import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../../interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductPromotionalCountComponent } from '../product-promotional-count/product-promotional-count.component';
import { fromEvent, Observable } from 'rxjs';

@Component({
  selector: "app-products-list",
  imports: [
    CommonModule,
    ProductCardComponent,
    ProductPromotionalCountComponent,
  ],
  providers: [ProductsService],
  templateUrl: "./products-list.component.html",
})
export class ProductsListComponent implements OnInit, AfterViewInit {
  public products: Product[] = [];

  @ViewChild(ProductPromotionalCountComponent, { static: false }) promotionalCount!: ProductPromotionalCountComponent;
  @ViewChild("title", { static: false }) titleComponent!: ElementRef;
  @ViewChildren(ProductCardComponent) cards!: QueryList<ProductCardComponent>;

  constructor(private productsService: ProductsService) {}

  ngAfterViewInit(): void {
    // ViewChild promotionalCount
    setTimeout(() => console.log("produtos", this.promotionalCount.products), 1000);

    // ViewChild titleComponent
    let clickTitleObs: Observable<any> = fromEvent(
      this.titleComponent.nativeElement,
      "click"
    );
    clickTitleObs.subscribe(() => alert("Title click"));

    // ViewChildren cards
    setTimeout(() => {
      this.cards.forEach(card => console.log("card:", card.product));
      
    }, 1000);
  }

  ngOnInit(): void {
    this.productsService.getProducts()
      .subscribe(
        {
          next: products => this.products = products,
          error: err => console.log(err)
        }
      );
  }

  togglePromotionalProduct(product: Product){
    product.promotional = !product.promotional;
    this.productsService.updateProduct(product.id, product).subscribe();
  }
}
