import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve } from "@angular/router";
import { Product } from "../../interfaces/product.interface";
import { ProductsService } from "./products.service";
import { Observable } from "rxjs";

@Injectable()
export class ProductsResolve implements Resolve<Product[]> {
  constructor(private productService: ProductsService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): MaybeAsync<Product[] | RedirectCommand> | Observable<Product[]> {
    return this.productService.getProducts(route.paramMap.get("state")!);
  }
}