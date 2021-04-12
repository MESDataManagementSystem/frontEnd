import { AuthServiceService } from './services/auth-service.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthServiceService, public router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLogin = this.authService.isLoginAdmin();
    if (!isLogin) {
      this.router.navigate(['/login']);
      return false;
    }
    return isLogin;
  }

  // canDeactivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   const isLogin = this.authService.isLogin();
  //   alert("adsf")
  //   // alert("here")
  //   // if (isLogin) {
  //   //   this.router.navigate(['/MES']);
  //   //   return false;
  //   // }

  //   return false;
  // }
}
