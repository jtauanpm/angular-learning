import { Routes } from "@angular/router";
import { ContaAppComponent } from "./conta.app.component";
import { CadastroComponent } from "./cadastro/cadastro.component";
import { LoginComponent } from "./login/login.component";
import { ContaGuard } from "./services/conta.guard";

export const contaRouterConfig: Routes = [
    { path: '', component: ContaAppComponent,
        children: [
            { path: 'login', component: LoginComponent, canActivate: [ContaGuard] },
            { path: 'cadastro', component: CadastroComponent, canActivate: [ContaGuard], canDeactivate: [ContaGuard] }
        ]
    }
];