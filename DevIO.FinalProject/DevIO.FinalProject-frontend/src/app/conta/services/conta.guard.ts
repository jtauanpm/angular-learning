import { CanActivate, CanDeactivate, Router } from "@angular/router";
import { CadastroComponent } from "../cadastro/cadastro.component";
import { inject, Injectable } from "@angular/core";
import { LocalStorageUtils } from "../../utils/local-storage";

@Injectable({
    providedIn: 'root'
})
export class ContaGuard implements CanDeactivate<CadastroComponent>, CanActivate {
    private router = inject(Router);

    canDeactivate(component: CadastroComponent): boolean {
        return component.mudancasNaoSalvas ?
            window.confirm('Tem certeza que deseja abandonar o preenchimento do formulário?') :
            true;
    }

    canActivate(): boolean {       
        if(LocalStorageUtils.obterTokenUsuario()) {
            this.router.navigate(['/home']);
        }
        return true;
    }

}
