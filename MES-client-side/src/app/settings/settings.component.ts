import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { AccountsService} from '../services/accounts.service';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements AfterViewInit {

  username: string;
  email: string
  password: string;
  accounts: any;
  value: string;
  
  displayedColumns: string[] = ['name','uname', 'mail', 'test'];
  dataSource = new MatTableDataSource<Info>(accountData);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private service: AccountsService ) { 
    this.username = "Admin1"
    this.password = "***********"
    this.email = "admin@gmail.com"
  }

  addAccount() {

  }
  
  

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.service.retrieveData().subscribe( student => { this.accounts = student; });
    console.log(this.accounts);
  }
}
export interface Info {
  name: string;
  uname: string;
  mail: string;
  test: boolean
}
const accountData: Info[] = [
  {name: 'Irish Rufo', uname: 'Irish', mail: 'irish@gmail.com', test: true},
  {name: 'Annabelle Belcina', uname: 'Annabelle', mail: 'annabelle@gmail.com', test: true},
  {name: 'John Doe', uname: 'John', mail: 'john@gmail.com', test: false},
  {name: 'Yubert Mariscal', uname: 'Yubert', mail: 'yubert@gmail.com', test: true},
  {name: 'Ma Theresa Ammaquin', uname: 'Theresa', mail: 'theresa@gmail.com', test: true},
  {name: 'Irish Rufo', uname: 'Irish', mail: 'irish@gmail.com', test: true},
  {name: 'Annabelle Belcina', uname: 'Annabelle', mail: 'annabelle@gmail.com', test: true},
  {name: 'John Doe', uname: 'John', mail: 'john@gmail.com', test: false},
  {name: 'Yubert Mariscal', uname: 'Yubert', mail: 'yubert@gmail.com', test: true},
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



