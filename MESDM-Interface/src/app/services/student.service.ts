import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  public data = [
    {
      lrn: 123456,
      name: 'Irish Rufo Solatorio'
    }
  ];

  constructor(private http: HttpClient) { }

  search(lrn: string): Observable<any> {
    return of(this.data);
    // return this.http.get("http://localhost:3000/search"+lrn)
  }
}
