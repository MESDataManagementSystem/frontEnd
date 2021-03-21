import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { AuthServiceService } from '../services/auth-service.service';
import { SwalService } from '../services/swal.service';
import { TeacherServiceService } from '../services/teacher-service.service';


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
  search: string;
  display = "none";
  display2 = "none";

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

  updateAccountControl = {
    username: "",
    password: "",
    adviser: "",
    role: "Teacher"
  }

  account: any;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['username', 'name', 'edit', 'delete'];


  constructor(
    private authService: AuthServiceService,
    private swal: SwalService,
    private teacherService: TeacherServiceService,
  ) {
    this.search = ''
    this.authService.viewListOfTeachersAccount('Teacher').subscribe(data => {
      this.account = data
      this.dataSource = new MatTableDataSource<any>(this.account.data)
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0)
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.adviser.toLocaleLowerCase().includes(filter)
      }
    })
  }

  ngOnInit(): void {
    this.getAdminCredential();
    this.getTeacher();
  }

  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }

  openModal1() {
    this.display2 = "block";
  }
  onCloseHandled1() {
    this.display2 = "none";
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
    this.authService.getCredentials('Admin').subscribe((data: any) => {
      const datum = data.data;
      if (data) {
        this.addAccountControl = datum
      }
    })
  }

  // Remove Account From The Table
  removeAccount(data) {
   
  }

  resetAddAccount() {
    this.addAccountControl1 = {
      username: "",
      password: "",
      adviser: "",
      role: "Teacher",
    }
  }

  resetAdminAccount() {
    this.addAccountControl = {
      username: "",
      password: "",
      role: "Admin",
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
  updateAdmin() {
    this.authService.updateCredentials(this.addAccountControl).subscribe(data => {
      if (data) {
        // this.swal.succesAlert();
        this.resetAdminAccount();
      }
    })
  }



  updateTeacherAccount() {
    this.authService.updateTeacherAccount(this.updateAccountControl).subscribe(data => {
      if (data) {
        // this.swal.succesAlert();
        this.resetAddAccount();
      }
    })
  }

  // For Confirmation Before Updating
  warningAlert() {
    Swal.fire({
      icon: 'warning',
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      confirmButtonText: `Save`,
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
        // login should be here
        this.updateAdmin();
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }




































































  // Search Specific Account
  filter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
