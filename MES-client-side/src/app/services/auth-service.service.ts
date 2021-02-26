import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  url = environment.url;
  user = null;
  authenticationState = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    ) {}

    register(credentials) {
      return this.http.post(`${this.url}/api/register`, credentials).pipe(
        catchError(e => {
          this.errorAlert();
          throw new Error(e);
        })
      );
    }
  
    login(credentials) {
      return this.http.post(`${this.url}/api/login`, credentials).pipe(
        catchError(e => {
          this.errorAlert();
          throw new Error(e);
        })
      )
    }

    setToken(token: string) {
      localStorage.setItem('token', token);
    }

    getToken() {
      return localStorage.getItem('token');
    }
  
    deleteToken() {
      localStorage.removeItem('token');
    }

    errorAlert() {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        showConfirmButton: false,
        timer: 1000
      })
    }
}
