import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, GuardResult, MaybeAsync, Router } from "@angular/router";
import { BaseGuard } from "../../services/base.guard";
import { NovoComponent } from "../novo/novo.component";

@Injectable({ providedIn: 'root' })
export class FornecedorGuard extends BaseGuard implements CanActivate, CanDeactivate<NovoComponent> {
    constructor(protected override router: Router) {
        super(router);
    }


    canDeactivate(component: NovoComponent): MaybeAsync<GuardResult> {
        if (component.mudancasNaoSalvas) {
            return confirm('Tem certeza que deseja abandonar o preenchimento do formulário?');
        }
        return true;
    }

    canActivate(route: ActivatedRouteSnapshot) {
        return super.validarClaims(route);
    }
}