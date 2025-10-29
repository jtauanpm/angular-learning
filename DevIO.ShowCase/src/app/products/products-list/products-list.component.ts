import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../../interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductPromotionalCountComponent } from '../product-promotional-count/product-promotional-count.component';
import { fromEvent, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute) {}

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
    // this.activatedRoute.data.subscribe(({ products }) => (this.products = products));
    this.products = this.activatedRoute.snapshot.data['products'];
    console.log(this.activatedRoute.snapshot.data['test'])
  }

  togglePromotionalProduct(product: Product){
    product.promotional = !product.promotional;
    this.productsService.updateProduct(product.id, product).subscribe();
  }
}
