import { Component, AfterViewInit, ViewChild , Inject} from '@angular/core';
import { AccountsService} from '../services/accounts.service';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';




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
  uname: string;
  pass: string;
  accountInfo = {
    username: '',
    password: '',
    email: '',
  }
  
  displayedColumns: string[] = ['uname',  'test'];
  dataSource = new MatTableDataSource<Info>(accountData);
  @ViewChild(MatPaginator) paginator: MatPaginator;



  constructor( private service: AccountsService,  @Inject(MAT_DIALOG_DATA) public data: Info, public dialog: MatDialog) { 

    this.username = "Admin1"
    this.password = "***********"
    this.email = "admin@gmail.com"
  }
  succesAlert(Text, Icon, Timer): void {
    Swal.fire({
      icon: Icon,
      title: 'Message',
      text: Text,
      showConfirmButton: false,
      timer: Timer
    });
  }


  addAccount(): void {
    console.log(this.accountInfo);
    console.log(this.service.addAccount);
    this.service.addAccount(this.accountInfo).subscribe(data => {
      // tslint:disable-next-line:no-conditional-assignment
      if (data.error) {
        this.succesAlert('Fill in all the fields!', 'error', '');
      }
      if (data.msg === 'Username Already exist') {
        this.succesAlert('Username ' + this.accountInfo.username + ' already exists!', 'error', 2000);
        this.accountInfo.username = '';
      }
      if (data.msg === 'Account Added!') {
        this.succesAlert('Added New Account Successfully', 'success', 1500);
        this.dialog.closeAll();
      }
      // if (data[0] === 'error'){

      // }
      console.log(data);
    });
  }

 

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.service.retrieveData().subscribe( student => { this.accounts = student; });
    console.log(this.accounts);
  }
}
export interface Info {
  uname: string;
  pass: string;
  email: string;
  test: boolean;
}
const accountData: Info[] = [
  {uname: 'Irish', pass: 'password', email: null,  test: true},
  { uname: 'Annabelle', pass: 'password', email: null, test: true},
  {uname: 'John',  pass: 'password', email: null, test: false},
  {uname: 'Yubert', pass: 'password', email: null,  test: true},
  {uname: 'Irish', pass: 'password', email: null, test: true},
  { uname: 'Annabelle', pass: 'password', email: null, test: true},
  {uname: 'John', pass: 'password', email: null, test: false},
  {uname: 'Yubert', pass: 'password', email: null, test: true},
  {uname: 'Irish', pass: 'password', email: null, test: true},
  { uname: 'Annabelle', pass: 'password', email: null,  test: true},
  {uname: 'John', pass: 'password', email: null, test: false},
  {uname: 'Yubert',  pass: 'password', email: null, test: true},
];



