import { Injectable } from '@angular/core';
import { Teacher } from '../all-teachers/teacher.model';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class TeacherServiceService {
  teacher: Array<any> = []
  returnSearch: Array<any> = [];
  id: string
  url = 'http://localhost:5000'
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private actRoute: ActivatedRoute) { }

  ngOnit() { }

  // Get All The List Of Teachers
  getAllTheTeachersList() {
    return this.http.get(`${this.url}/api/viewListOfTeacher`);
  }

  // View The Information Of A Specific Teacher
  viewTeacher(id) {
    return this.http.get(`${this.url}/api/viewTeachersInfo/${id}`)
      .pipe(
        catchError(e => {
          this.errorAlert2();
          throw new Error(e)
        })
      )
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

  // Update Teacher's Information
  updateTeacher(teacher: Teacher) {
    return this.http.put(`${this.url}/api/updateTeachersInfo/${teacher._id}`, teacher)
      .pipe(
        catchError(e => {
          this.errorAlert2();
          throw new Error(e)
        })
      )
  }

  errorAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'All Fields Are Required!'
    })
  }

  errorAlert2() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something Went Wrong'
    })
  }

}




























