import { Routes } from '@angular/router';
import { HomeComponent } from './navegacao/home/home.component';
import { NotFoundComponent } from './navegacao/not-found/not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    {
        path: "conta",
        loadChildren: () =>
            import("./conta/conta.route")
            .then(routes => routes.contaRouterConfig)
    },
    {
        path: "fornecedores",
        loadChildren: () =>
            import("./fornecedor/fornecedor.route")
            .then(routes => routes.fornecedorRouterConfig)
    },
    { path: '**', component: NotFoundComponent }
];
