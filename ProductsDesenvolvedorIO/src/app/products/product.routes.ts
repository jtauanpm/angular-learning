import { Routes } from "@angular/router";
import { ProductsListComponent } from "./products-list/products-list.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductAppComponent } from "./product.app.component";
import { ProductsResolve } from "./services/product.resolve";

export const PRODUCT_ROUTES: Routes = [
  {
    path: "",
    component: ProductAppComponent,
    children: [
      { path: "", redirectTo: "todos", pathMatch: "full" },
      {
        path: ":state",
        component: ProductsListComponent,
        resolve: { products: ProductsResolve },
        data: {
          test: 'test data route'
        }
      },
      { path: "detail/:id", component: ProductDetailComponent },
    ],
  },
];