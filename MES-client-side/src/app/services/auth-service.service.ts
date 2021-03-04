import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { SwalService } from '../services/swal.service';

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

  login(credentials) {
    return this.http.post(`${this.url}/api/login`, credentials).pipe(
      catchError(e => {
        this.swal.errorAlertForSomethingWentWrong();
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

}
