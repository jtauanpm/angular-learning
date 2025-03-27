import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, CanLoad, CanMatch, CanMatchFn, GuardResult, MaybeAsync, Route, RouterStateSnapshot, UrlSegment } from "@angular/router";

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