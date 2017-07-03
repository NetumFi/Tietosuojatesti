import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
@Injectable()
export class BackingUpFromResultsNotAllowedGuard implements CanActivate {

  previousPageResults = false;

  constructor() { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const access = !this.previousPageResults || route.url.toString().indexOf('kysymykset') === -1;
    if (access) {
      this.previousPageResults = state.url.toString().indexOf('tulokset') !== -1;
    }
    return access;
  }
}
