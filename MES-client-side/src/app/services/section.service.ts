import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  url = 'http://localhost:5000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient
  ) { }

  ngOnit(): void { }

  // Add Teachers
  addTeacher(classesForm): Observable<any>{
    return this.http.post(`${this.url}/api/addSection`, classesForm).pipe(
      catchError(e => {
        this.errorAlert();
        throw new Error(e);
      })
    );
  }

  errorAlert(): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something Went Wrong! Try To Input Again'
    });
  }
  viewSections(grade): Observable<any>{
    return this.http.get(`${this.url}/api/viewSection/${grade}`);
  }

  getSection(section): Observable<any>{
    console.log(section + 'forToken');
    return this.http.get(`${this.url}/api/generateSection/${section}`);
  }

}
