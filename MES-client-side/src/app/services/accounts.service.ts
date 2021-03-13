import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  accountData = [
    
  ];

  constructor( private httpClient: HttpClient ) { }

  retrieveData(): Observable<any>{
    return of(this.accountData);
  }
  addAccount(account): Observable<any> {
    return this.httpClient.post('http://localhost:5000/api/addAccount/', account);
  }
}
