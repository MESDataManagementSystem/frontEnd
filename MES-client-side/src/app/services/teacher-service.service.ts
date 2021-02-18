import { Injectable } from '@angular/core';
import { Teacher } from '../all-teachers/teacher.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class TeacherServiceService {

  url = 'http://localhost:5000'
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Get All The List Of Teachers
  getAllTheTeachersList() {
    return this.http.get(`${this.url}/api/viewListOfTeacher`);
  }

  // Add Teachers
  addTeacher(teachersForm) {
    return this.http.post(`${this.url}/api/addTeachersInfo`, teachersForm).pipe(
      catchError(e => {
        this.errorAlert();
        throw new Error(e)
      })
    )
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
    // console.log(errorMessage);
    return throwError(errorMessage);
  }

  errorAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'All Fields Are Required!'
    })
  }

}
