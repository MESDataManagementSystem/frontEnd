import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { SwalService } from '../services/swal.service';
// import jwt_decode from 'jwt-decode';
import * as jwt_decode from "jwt-decode";

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
    // const decodedToken: any = jwt_decode(token);
    // console.log(decodedToken);
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

  deleteToken() {
    localStorage.removeItem('token');
  }

  getAdminCredential(status) {
    return this.http.get(`${this.url}/api/getAdminCredentials/${status}`)
      .pipe(
        catchError(e => {
          this.swal.errorAlertForSomethingWentWrong()
          throw new Error(e)
        })
      )
  }

  // updateAdminCredentials(status, role) {
  //   return this.http.put(`${this.url}/api/updateAdminCredentials/${status}`,status, role)
  //     .pipe(
  //       catchError(e => {
  //         this.swal.errorAlertForSomethingWentWrong()
  //         throw new Error(e)
  //       })
  //     )
  // }
}
