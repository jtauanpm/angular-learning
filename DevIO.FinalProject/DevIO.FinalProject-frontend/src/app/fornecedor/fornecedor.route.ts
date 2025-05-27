import { Routes, RouterModule } from '@angular/router';

import { FornecedorAppComponent } from './fornecedor.app.component';
import { NovoComponent } from './novo/novo.component';
import { ListaComponent } from './lista/lista.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { FornecedorResolve } from './services/fornecedor.resolve';

export const fornecedorRouterConfig: Routes = [
    {
        path: '', component: FornecedorAppComponent,
        children: [
            { path: 'listar-todos', component: ListaComponent },
            { path: 'adicionar-novo', component: NovoComponent },
            { path: 'editar/:id', component: EditarComponent, resolve: { fornecedor: FornecedorResolve }, providers: [FornecedorResolve] },
            { path: 'detalhes/:id', component: DetalhesComponent, resolve: { fornecedor: FornecedorResolve }, providers: [FornecedorResolve] },
            { path: 'excluir/:id', component: ExcluirComponent, resolve: { fornecedor: FornecedorResolve }, providers: [FornecedorResolve] }
        ]
    }
];