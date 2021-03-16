import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { SwalService } from '../services/swal.service';
import jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  url = 'http://localhost:5000'
  user = null;
  authenticationState = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private swal: SwalService
  ) { }

  register(credentials) {
    return this.http.post(`${this.url}/api/register`, credentials).pipe(
      catchError(e => {
        this.swal.errorAlertForSomethingWentWrong();
        throw new Error(e);
      })
    );
  }

  isLogin(): any {
    const token = window.localStorage.getItem('token');
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    // const decodedToken = jwt_decode(token);
    console.log(decodedToken);
    // console.log(decodedToken.exp);
    // console.log(new Date());
    return token != null;

  }

  login(credentials): Observable<any> {
    return this.http.post(`${this.url}/api/login`, credentials).pipe(
      map((response: any) => {
        window.localStorage.setItem('token', response.token);
        this.isLogin();
      }),
      catchError(e => {
        this.swal.errorAlertForSomethingWentWrong();
        throw new Error(e);
      })
    );
  }

  // setToken(token: string) {
  //   localStorage.setItem('token', token);
  // }

  // getToken() {
  //   return localStorage.getItem('token');
  // }

  deleteToken(): void {
    localStorage.removeItem('token');
  }

}
