import { AuthServiceService } from './services/auth-service.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLogInActivateGuard implements CanActivate {
  constructor(public authService: AuthServiceService, public router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     const isLoginAdmin = this.authService.isLoginAdmin();
     const isLoginTeacher = this.authService.isLoginTeacher();
    const user = this.authService.user;
    if (isLoginAdmin) {
      this.router.navigate(['/MES']);
      return false;
    }
    if(isLoginTeacher){
      this.router.navigate(['/teacher/dashboard']);
      return false;
    }
    return true;
  }

}
