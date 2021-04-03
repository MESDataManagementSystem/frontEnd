import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
// import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {
  // tslint:disable-next-line:max-line-length
  studentData = [];
  returnSearch: Array<any> = [];
  constructor(
    private httpClient: HttpClient
  ) { }

  // return list of old files in all-students component
  retrieveData(): Observable<any> {
    return this.httpClient.get('http://localhost:5000/api/viewListOfOldFiles');

  }

  handleError(e): any {
    return e;
  }

  studentForm(fileToUpload: FormData): Observable<any> {
    return this.httpClient.post('http://localhost:5000/uploadSingleFile', fileToUpload);
  }

  viewFile(url): Observable<any> {
    console.log(url);
    return this.httpClient.post('http://localhost:5000/api/viewFile', url);
  }

  addStudent(student): Observable<any> {
    return this.httpClient.post('http://localhost:5000/api/addStudent', student);
  }

  viewStudents(section, grade): Observable<any> {
    return this.httpClient.get(`http://localhost:5000/api/viewStudents/${section}/${grade}`);
  }

  findStudent(id): Observable<any> {
    console.log(id, 'sa service ni');
    return this.httpClient.get(`http://localhost:5000/api/findStudent/${id}`);
  }

  updateStudent(student): Observable<any> {
    console.log(student._id, 'id sa student service nga iupdate');
    return this.httpClient.post(`http://localhost:5000/api/updateStudent/${student._id}`, student);
  }
  findGrade(grade): Observable<any> {
    console.log(grade, 'grade in service');
    return this.httpClient.get(`http://localhost:5000/api/findGrade/${grade}`);
  }
  // subjects grade
  findStudentGrades(subject): Observable<any> {
    console.log(subject);
    return this.httpClient.post(`http://localhost:5000/api/findStudentGrades/${subject.id}`, subject);
  }
  updateStudentGrades(subject): Observable<any> {
    console.log(subject);
    return this.httpClient.post(`http://localhost:5000/api/updateStudentGrades/${subject.id}`, subject);
  }
  addStudentGrades(grades): Observable<any> {
    return this.httpClient.post('http://localhost:5000/api/addStudentGrades', grades);
  }
  findQuarter(datas): Observable<any> {
    console.log(datas, 'sa service na ni nga quarter');
    return this.httpClient.post(`http://localhost:5000/api/findQuarter`, datas);
  }
  nextGrade(data): Observable<any> {
    console.log(data, 'data');
    return this.httpClient.post(`http://localhost:5000/api/nextgrade`, data);
  }



}
