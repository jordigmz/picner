import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaIdGuard implements CanActivate {
  private constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(route.paramMap.get('id').length === 24 && /^[A-Za-z0-9]*$/.test(route.paramMap.get('id'))) {
      return true;
    } else {
      console.log('invalid id');
      return this.router.createUrlTree(['/areas']);
    }
  }
}
