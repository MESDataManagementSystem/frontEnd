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
    ) {    }

  retrieveData(): Observable<any> {
    return this.httpClient.get('http://localhost:5000/api/viewListOfOldFiles');

  }

  handleError(e): any{
    return e;
  }

  studentForm(fileToUpload: FormData): Observable<any> {
    return this.httpClient.post('http://localhost:5000/uploadSingleFile', fileToUpload);
  }

   viewFile(url): Observable<any>{
     console.log(url);
     return this.httpClient.post('http://localhost:5000/api/viewFile', url);
   }



}
