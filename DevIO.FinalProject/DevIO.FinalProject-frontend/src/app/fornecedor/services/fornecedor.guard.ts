import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { LocalStorageUtils } from "../../utils/local-storage";

@Injectable({ providedIn: 'root' })
export class FornecedorGuard implements CanActivate {
    private router = inject(Router);

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