import { Injectable } from '@angular/core';
import { Teacher } from '../all-teachers/teacher.model';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SwalService } from '../services/swal.service';

@Injectable({
  providedIn: 'root'
})

export class TeacherServiceService {

  url = 'http://localhost:5000'
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    private swal: SwalService
  ) { }

  ngOnit() { }

  // Get All The List Of Teachers
  getAllTheTeachersList(status) {
    return this.http.get(`${this.url}/api/viewListOfTeacher/${status}`);
  }

  // View The Information Of A Specific Teacher
  viewTeacher(id) {
    return this.http.get(`${this.url}/api/viewTeachersInfo/${id}`)
      .pipe(
        catchError(e => {
          this.swal.errorAlertForSomethingWentWrong()
          throw new Error(e)
        })
      )
  }

  // Add Teachers
  addTeacher(teachersForm) {
    return this.http.post(`${this.url}/api/addTeachersInfo`, teachersForm).pipe(
      catchError(e => {
        this.swal.errorAlertForAllFieldsAreRequired();
        throw new Error(e)
      })
    )
  }

  // Update Teacher's Information
  updateTeacher(teacher: Teacher) {
    return this.http.put(`${this.url}/api/updateTeachersInfo/${teacher._id}`, teacher)
      .pipe(
        catchError(e => {
          this.swal.errorAlertForAllFieldsAreRequired();
          throw new Error(e)
        })
      )
  }

  // TEACHER SIDE DASHBOARD
  findAdviser(adviserId){
    return this.http.get(`${this.url}/api/findAdviser/${adviserId}`)
  }

  // find teacher population for dashboard
  teacherPopulation(){
    return this.http.get(`${this.url}/api/teacherPopulation`);
  }

}




























