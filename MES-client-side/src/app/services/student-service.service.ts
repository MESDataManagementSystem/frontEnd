import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {
  // tslint:disable-next-line:max-line-length
  studentData = [{name: 'Irish Rufo', lrn: '18106242'}, {name: 'Ma. Theresa Amaquin', lrn: '123456'}, {name: 'Yubert Mariscal', lrn: '456788'}, {name: 'Annabelle Belcina', lrn: '45678'}];
  constructor() { }

  retrieveData(): Observable<any>{
    return of(this.studentData);
  }
}
