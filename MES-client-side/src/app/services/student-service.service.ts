import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {
  // tslint:disable-next-line:max-line-length
  studentData = [ {name: 'Irish Rufo', lrn: '18106242'}, {name: 'Ma. Theresa Amaquin', lrn: '123456'}, {name: 'Yubert Mariscal', lrn: '456788'}, {name: 'Annabelle Belcina', lrn: '45678'}];
  returnSearch: Array<any> = [];
  constructor() { }

  retrieveData(): Observable<any>{
    return of(this.studentData);
  }

  searchbyLRN(data): Observable<any>{
    this.returnSearch = [];
    console.log(data);
    if (data !== ''){
      this.studentData.forEach(student => {
        if (student.lrn.includes(data.trim())){
          this.returnSearch.push(student);
          console.log('okii naa sya');
        }else{
          console.log('no no');
        }
      });
    }else{
      this.returnSearch = this.studentData;
    }
    console.log(this.returnSearch);
    return of(this.returnSearch);
  }

  searchbyFamilyName(data): Observable<any>{
    this.returnSearch = [];
    console.log(data);
    if (data !== ''){
      this.studentData.forEach(student => {
        if (student.name.toLowerCase().includes(data.trim())){
          this.returnSearch.push(student);
          console.log('okii naa sya');
        }else{
          console.log('no no');
        }
      });
    }else{
      this.returnSearch = this.studentData;
    }
    console.log(this.returnSearch);
    return of(this.returnSearch);
  }
}
