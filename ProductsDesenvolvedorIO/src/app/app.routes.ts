import { Routes } from '@angular/router';
import { HomeComponent } from './navigation/home/home.component';
import { ContactComponent } from './institutional/contact/contact.component';
import { AboutComponent } from './institutional/about/about.component';
import { RXJSComponent } from './demos/rxjs/rxjs.component';
import { CadastroComponent } from './demos/reactiveForms/cadastro/cadastro.component';

export const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "contact", component: ContactComponent },
  { path: "about", component: AboutComponent },
  { path: "rxjs", component: RXJSComponent },
  { path: "cadastro", component: CadastroComponent },
  { path: "databinding",
    loadComponent: () => import('./demos/data-binding/data-binding.component')
    .then(dataBinding => dataBinding.DataBindingComponent)},
  { path: "products", 
    loadChildren: () => import('./products/product.routes')
    .then(routes => routes.PRODUCT_ROUTES) }
];

