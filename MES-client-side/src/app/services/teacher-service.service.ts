import { Injectable } from '@angular/core';
import { Teacher } from '../all-teachers/teacher.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class TeacherServiceService {

  url = environment.url;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private http: HttpClient) { }

  // Get all the list of teachers
  getAllTheTeachersList() {
    return this.http.get(`${this.url}/api/viewListOfTeacher`);
  }


  errorHandling(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // getting the client-side error
      errorMessage = error.error.message;
    } else {
      // getting the server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
