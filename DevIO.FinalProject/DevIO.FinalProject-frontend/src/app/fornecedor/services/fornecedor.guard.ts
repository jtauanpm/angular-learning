import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { LocalStorageUtils } from "../../utils/local-storage";
import { NovoComponent } from "../novo/novo.component";

@Injectable({ providedIn: 'root' })
export class FornecedorGuard implements CanActivate, CanDeactivate<NovoComponent> {
    private router = inject(Router);

    canDeactivate(component: NovoComponent): MaybeAsync<GuardResult> {
        if (component.mudancasNaoSalvas) {
            return confirm('Tem certeza que deseja abandonar o preenchimento do formulário?');
        }
        return true;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!LocalStorageUtils.obterTokenUsuario()) {
            this.router.navigate(['/conta/login']);
            return false;
        }

        let user = LocalStorageUtils.obterUsuario();
        if (!user?.claims) {
            this.navegarAcessoNegado();
            return false;
        }

        let forRouteClaim: any = route.data[0]?.['claim'];
        if (forRouteClaim) {
            let fornecedorClaims = user.claims.find((c: any) => c.type === forRouteClaim.nome);
            if (!fornecedorClaims) {
                this.navegarAcessoNegado();
                return false;
            }
    
            let claimValues = fornecedorClaims.value as string;
            if (!claimValues.includes(forRouteClaim.valor)) {
                this.navegarAcessoNegado();
                return false;
            }
        }

        return true;
    }

    navegarAcessoNegado() {
        this.router.navigate(['/acesso-negado']);
    }
}