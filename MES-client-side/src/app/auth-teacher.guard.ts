import { AuthServiceService } from './services/auth-service.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthTeacherGuard implements CanActivate {
  constructor(public authService: AuthServiceService, public router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLogin = this.authService.isLoginTeacher();
    if (!isLogin) {
      this.router.navigate(['/login']);
      return false;
    }
    console.log(isLogin)  
    return isLogin;
  }
}
