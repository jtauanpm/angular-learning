import { Injectable } from '@angular/core';
import { CanDeactivate, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { NovoComponent } from '../novo/novo.component';
import { LocalStorageUtils } from '../../utils/local-storage';

@Injectable({providedIn: 'root'})
export class ProdutoGuard implements CanActivate, CanDeactivate<NovoComponent> {
    constructor(private router: Router){}

    canDeactivate(component: NovoComponent) {
        if(component.mudancasNaoSalvas) {
            return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulario?');
        }        
        return true
    }

    canActivate(routeAc: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(!LocalStorageUtils.obterTokenUsuario()){
            this.router.navigate(['/conta/login/'], { queryParams: { returnUrl: this.router.url }});
        }  

        let user = LocalStorageUtils.obterUsuario();

        let claim: any = routeAc.data[0];
        if (claim !== undefined) {
            let claim = routeAc.data[0]['claim'];

            if (claim) {
                if (!user.claims) {
                    this.navegarAcessoNegado();
                }
                
                let userClaims = user.claims.find((x: any) => x.type === claim.nome);
                
                if(!userClaims){
                    this.navegarAcessoNegado();
                }
                
                let valoresClaim = userClaims.value as string;

                if (!valoresClaim.includes(claim.valor)) {
                    this.navegarAcessoNegado();
                }
            }
        }

        return true;  
    }

    navegarAcessoNegado() {
        this.router.navigate(['/acesso-negado']);
    }
}