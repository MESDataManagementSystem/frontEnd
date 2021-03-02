import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  url = 'http://localhost:5000'
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient
  ) { }

  ngOnit() { }

  // Add Teachers
  addTeacher(classesForm) {
    return this.http.post(`${this.url}/api/addSection`, classesForm).pipe(
      catchError(e => {
        this.errorAlert();
        throw new Error(e)
      })
    )
  }

  errorAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something Went Wrong! Try To Input Again'
    })
  }
  
  viewSections(grade){
    return this.http.get(`${this.url}/api/viewSection/${grade}`);
  }

}
