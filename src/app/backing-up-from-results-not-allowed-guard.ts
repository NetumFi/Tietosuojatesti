import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
@Injectable()
export class BackingUpFromResultsNotAllowedGuard implements CanActivate {

  previousPageResultsOrUndefined = true;

  constructor() { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const access = !this.previousPageResultsOrUndefined || route.url.toString().indexOf('kysymykset') === -1;
    if (access) {
      this.previousPageResultsOrUndefined = state.url.toString().indexOf('tulokset') !== -1
    }
    return access;
  }
}
