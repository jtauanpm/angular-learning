import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, CanDeactivateFn, CanLoad, CanMatch, CanMatchFn, GuardResult, MaybeAsync, Route, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { CadastroComponent } from "../demos/reactiveForms/cadastro/cadastro.component";

export const user: any = {
  IsLoggedIn: true, IsAdmin: true
};

// deprecated
@Injectable({ providedIn: "root" })
export class AuthGuardCanLoad implements CanLoad {
  canLoad(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
    console.log("canLoad");
    if (user.IsAdmin) return true;
    return false;
  }
}

export const AuthGuardCanMatch: CanMatchFn = () => {
    console.log("canMatch");
    if (user.IsAdmin) return true;
    return false;
}

export const AuthGuardCanActivate: CanActivateFn = () => {
  console.log("canActivate");
  if (user.IsLoggedIn) return true;
  return false;
};

export const CadastroGuardCanDeactivate: CanDeactivateFn<CadastroComponent> = (component) => {
  console.log("canDeactivate");
  if (component.cadastroForm && component.cadastroForm.dirty && !component.wasSaved) {
    return window.confirm('Tem certeza que deseja descartar as alterações do formulário?');
  }

  return true;
};