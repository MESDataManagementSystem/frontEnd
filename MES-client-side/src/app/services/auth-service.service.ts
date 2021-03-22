import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { SwalService } from '../services/swal.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  url = 'http://localhost:5000'
  user: any;
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

  isLoginAdmin(): any {
    const token = window.localStorage.getItem('token');
    if(token){
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      // const decodedToken = jwt_decode(token);
      console.log(decodedToken, 'decoded token');
      this.user = decodedToken;
      if (this.user.role === 'Admin'){
        return true;
      }
    }
    return false;
  }
  isLoginTeacher(): any {
    const token = window.localStorage.getItem('token');
    if(token){
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      this.user = decodedToken;
      if (this.user.role === 'Teacher'){
        return true;
      }
    }
    return false;
  }
  login(credentials): Observable<any> {
    return this.http.post(`${this.url}/api/login`, credentials).pipe(
      map((response: any) => {
        window.localStorage.setItem('token', response.token);
        this.isLoginAdmin();
        this.isLoginTeacher();
        return response;
      }),
      catchError(e => {
        this.swal.errorAlertForSomethingWentWrong();
        throw new Error(e);
      })
    );
  }

  deleteToken(): void {
    localStorage.removeItem('token');
  }

  getCredentials(status) {
    return this.http.get(`${this.url}/api/getCredentials/${status}`)
      .pipe(
        catchError(e => {
          this.swal.errorAlertForSomethingWentWrong()
          throw new Error(e)
        })
      )
  }

  updateCredentials(status) {
    return this.http.put(`${this.url}/api/updateCredentials/${status.role}`, status)
      .pipe(
        catchError(e => {
          this.swal.errorAlertForSomethingWentWrong()
          throw new Error(e)
        })
      )
  }

  updateTeacherAccount(status) {
    return this.http.put(`${this.url}/api/updateTeacherCredentials/${status.role}`, status)
      .pipe(
        catchError(e => {
          this.swal.errorAlertForSomethingWentWrong()
          throw new Error(e)
        })
      )
  }

  viewListOfTeachersAccount(status) {
    return this.http.get(`${this.url}/api/viewTeacherAccount/${status}`)
  }

  findAccount(id): Observable<any> {
    return this.http.get(`${this.url}/api/findAccount/${id}`);
  }

  deleteAccount(id): Observable<any> {
    return this.http.delete(`${this.url}/api/removeAccount/${id}`)
  }

  // Find teacher in setting
  findTeacher(id): Observable<any> {
    console.log(id,'id sa service')
    return this.http.get(`${this.url}/api/findTeacher/${id}`)
  }

}
