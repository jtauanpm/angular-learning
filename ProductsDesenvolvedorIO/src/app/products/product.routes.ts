import { Routes } from "@angular/router";
import { ProductsListComponent } from "./products-list/products-list.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductAppComponent } from "./product.app.component";

export const PRODUCT_ROUTES: Routes = [
  {
    path: "",
    component: ProductAppComponent,
    children: [
      { path: "", component: ProductsListComponent },
      { path: ":id", component: ProductDetailComponent },
    ],
  },
];