import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthServiceService } from '../services/auth-service.service';
import { SwalService } from '../services/swal.service';
import { TeacherServiceService } from '../services/teacher-service.service';


export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  error = new FormControl('', [Validators.required]);
  error2 = new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])
  public buttonName: any = 'Click To Edit';
  hideOverlay = true;
  hide = true;
  hide1 = true;
  otherList = [];
  teacherList: any;
  teacherId = '';




  addAccountControl = {
    username: "",
    password: "",
    role: "Admin"
  }

  addAccountControl1 = {
    username: "",
    password: "P@ssw0rd",
    adviser: "",
    role: "Teacher"
  }

  displayedColumns: string[] = ['id', 'name', 'progress', 'color'];
  dataSource: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private authService: AuthServiceService,
    private swal: SwalService,
    private teacherService: TeacherServiceService,

  ) {
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    this.dataSource = new MatTableDataSource(users);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 0)
  }

  ngOnInit(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAdminCredential();
    this.getTeacher();

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // All Fields Are Required 
  getErrorMessage() {
    if (this.error.hasError('required')) {
      return 'You must enter a value';
    }
  }

  // All Fields Are Required 
  getErrorMessage2() {
    if (this.error.hasError('required')) {
      return 'Password must contain at least 1 uppercase, 1 lowercase, numbers and special characters';
    }
  }

  // Adding Account For Teacher
  addAccountTeacher() {
    const data = { ...this.addAccountControl1, adviser: this.teacherId };
    this.authService.register(data).subscribe(data => {
      if (data) {
        this.swal.succesAlert();
        // this.resetAddAccount();
      } else {
        this.swal.errorAlertForSomethingWentWrong();
      }
    })
  }

  // Getting The Credentials Of The Admin 
  getAdminCredential() {
    this.authService.getAdminCredential('Admin').subscribe((data: any) => {
      const datum = data.data;
      if (data) {
        this.addAccountControl = datum
      }
    })
  }

  resetAddAccount() {
    this.addAccountControl1 = {
      username: "",
      password: "",
      adviser: "",
      role: "Teacher",
    }
  }

  // Get Teacher
  getTeacher(): void {
    this.teacherService.getAllTheTeachersList('yes').subscribe(data => {
      if (data) {
        this.teacherList = data;
        this.teacherList = this.teacherList.data;
        this.teacherList.forEach(data => {
          this.otherList.push(data);
        })
      }
    })
  }

  // Update Admin
  // updateAdmin() {
  //   this.authService.updateAdminCredentials(this.addAccountControl,'Admin').subscribe(data => {
  //     if (data) {
  //       console.log("Itz a prank")
  //     }
  //   })
  // }
  
}

function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}
