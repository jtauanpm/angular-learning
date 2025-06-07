import { Routes } from '@angular/router';
import { HomeComponent } from './navegacao/home/home.component';
import { NotFoundComponent } from './navegacao/not-found/not-found.component';
import { AcessoNegadoComponent } from './navegacao/acesso-negado/acesso-negado.component';

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
    {
        path: "produtos",
        loadChildren: () =>
            import("./produto/produto.route")
            .then(routes => routes.produtoRouterConfig)
    },
    { path: 'acesso-negado', component: AcessoNegadoComponent },
    { path: '**', component: NotFoundComponent }
];
