import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  accountData = [
    {name: 'Irish Rufo', uname: 'Irish', mail: 'irish@gmail.com', test: true},
    {name: 'Annabelle Belcina', uname: 'Annabelle', mail: 'annabelle@gmail.com', test: true},
    {name: 'John Doe', uname: 'John', mail: 'john@gmail.com', test: false},
    {name: 'Yubert Mariscal', uname: 'Yubert', mail: 'yubert@gmail.com', test: true},
    {name: 'Ma Theresa Ammaquin', uname: 'Theresa', mail: 'theresa@gmail.com', test: true},
    {name: 'Irish Rufo', uname: 'Irish', mail: 'irish@gmail.com', test: true},
    {name: 'Annabelle Belcina', uname: 'Annabelle', mail: 'annabelle@gmail.com', test: true},
    {name: 'John Doe', uname: 'John', mail: 'john@gmail.com', test: false},
    {name: 'Yubert Mariscal', uname: 'Yubert', mail: 'yubert@gmail.com', test: true},
  ];

  constructor() { }

  retrieveData(): Observable<any>{
    return of(this.accountData);
  }
}
