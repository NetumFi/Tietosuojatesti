import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
@Injectable()
export class BackingUpGuard implements CanActivate {

  previousPageResultsOrUndefined = true;

  constructor() { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const access = !this.previousPageResultsOrUndefined || route.url.toString().indexOf('kysymykset') === -1;
    if (access) {
      this.previousPageResultsOrUndefined = state.url.indexOf('tulokset') !== -1;
    }
    return access;
  }
}
