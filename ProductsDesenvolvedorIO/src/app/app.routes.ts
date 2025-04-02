import { Routes } from '@angular/router';
import { HomeComponent } from './navigation/home/home.component';
import { ContactComponent } from './institutional/contact/contact.component';
import { AboutComponent } from './institutional/about/about.component';
import { RXJSComponent } from './demos/rxjs/rxjs.component';
import { CadastroComponent } from './demos/reactiveForms/cadastro/cadastro.component';
import { NotFoundComponent } from './navigation/not-found/not-found.component';
import { AuthGuardCanActivate, AuthGuardCanMatch, CadastroGuardCanDeactivate } from './services/app.guard';
import { MoviesComponent } from './demos/pipes/movies/movies.component';
import { BarComponent } from './demos/di-zones/bar/bar.component';

export const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "contact", component: ContactComponent },
  { path: "about", component: AboutComponent },
  { path: "rxjs", component: RXJSComponent },
  { path: "movies", component: MoviesComponent },
  { path: "bar-di-zones", component: BarComponent },
  {
    path: "cadastro",
    component: CadastroComponent,
    canDeactivate: [CadastroGuardCanDeactivate],
  },
  {
    path: "databinding",
    loadComponent: () =>
      import("./demos/data-binding/data-binding.component").then(
        (dataBinding) => dataBinding.DataBindingComponent
      ),
  },
  {
    path: "products",
    loadChildren: () =>
      import("./products/product.routes").then(
        (routes) => routes.PRODUCT_ROUTES
      ),
  },
  {
    path: "admin",
    loadComponent: () =>
      import("./admin/admin/admin.component").then(
        (admin) => admin.AdminComponent
      ),
    canMatch: [AuthGuardCanMatch],
    canActivate: [AuthGuardCanActivate],
  },
  { path: "**", component: NotFoundComponent },
];

