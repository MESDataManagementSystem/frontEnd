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
    // return of(this.studentData);
    return this.httpClient.get('http://localhost:5000/api/viewListOfOldFiles');

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
    const datas = this.retrieveData();
    datas.forEach(datum => {
      console.log(datum);
    });
    this.returnSearch = [];
    // console.log(data);
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
      return this.retrieveData();
    }
    console.log(this.returnSearch);
    return of(this.returnSearch);
  }

  handleError(e): any{
    return e;
  }

  studentForm(fileToUpload: FormData): Observable<any> {
    console.log('adto nis services : ', fileToUpload);
    return this.httpClient.post('http://localhost:5000/uploadSingleFile', fileToUpload);
  }

   viewFile(url): Observable<any>{
     console.log(url);
     return this.httpClient.post('http://localhost:5000/api/viewFile', url);
   }


}
