import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
// import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {
  // tslint:disable-next-line:max-line-length
  studentData = [{ name: 'Irish Rufo', lrn: '18106242' }, { name: 'Ma. Theresa Amaquin', lrn: '123456' }, { name: 'Yubert Mariscal', lrn: '456788' }, { name: 'Annabelle Belcina', lrn: '45678' }];
  returnSearch: Array<any> = [];
  constructor(
    // private httpClient: HttpClient
    ) { }

  retrieveData(): Observable<any> {
    return of(this.studentData);
  }

  searchbyLRN(data): Observable<any> {
    this.returnSearch = [];
    console.log(data);
    if (data !== '') {
      this.studentData.forEach(student => {
        if (student.lrn.includes(data.trim())) {
          this.returnSearch.push(student);
          console.log('okii naa sya');
        } else {
          console.log('no no');
        }
      });
    } else {
      this.returnSearch = this.studentData;
    }
    console.log(this.returnSearch);
    return of(this.returnSearch);
  }

  searchbyFamilyName(data): Observable<any> {
    this.returnSearch = [];
    console.log(data);
    if (data !== '') {
      this.studentData.forEach(student => {
        if (student.name.toLowerCase().includes(data.trim())) {
          this.returnSearch.push(student);
          console.log('okii naa sya');
        } else {
          console.log('no no');
        }
      });
    } else {
      this.returnSearch = this.studentData;
    }
    console.log(this.returnSearch);
    return of(this.returnSearch);
  }

  handleError(e): any{
    return e;
  }

  // studentForm(fileToUpload: File): any {
  //   const endpoint = 'http://localhost:5000/uploadSingleFile';
  //   const formData: FormData = new FormData();
  //   formData.append('fileKey', fileToUpload, fileToUpload.name);
  //   return this.httpClient.post(endpoint, formData).pipe(map(() => true), catchError((e) => this.handleError(e)));
  // }

}
