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
  hide2 = true;
  hide3 = true;

  otherList = [];
  updateTeacherAdvisory = [];
  teacherHasAccount: any;
  teacherList: any;
  teacherId = '';
  search: string;
  display = "none";
  display2 = "none";


  loginControl = {
    username: "",
    password: ""
  }

  addAccountControl = {
    username: "",
    password: "",
    confirmPassword: "",
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
    adviser: "hahaha",
    role: "Teacher"
  }
  isLoading = true;
  updateTeacher = {
    username: '',
    password: ''
  }
  // dataSource = null;

  // account: any[] = [];
  account: any = { acc: { adviser: '', role: '', username: '' }, adviser: [{ firstName: '', lastName: '', middleName: '' }] }
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['username', 'name', 'edit', 'delete'];


  constructor(
    private authService: AuthServiceService,
    private swal: SwalService,
    private teacherService: TeacherServiceService,
  ) {
    this.search = ''
    this.authService.viewListOfTeachersAccount('Teacher').subscribe((data: any) => {
      var count = 0;
      this.account = data.data
      this.dataSource = new MatTableDataSource<any>(this.account)
      for (let i = 0; i < this.account.length; i++) {
        this.authService.findTeacher(this.account[i].adviser).subscribe((teacher: any) => {
          this.teacherHasAccount = teacher;
          this.account[i] = { acc: this.account[i], adviser: this.teacherHasAccount }
          this.dataSource = new MatTableDataSource<any>(this.account)
          // this.isLoading = false;
          count = i;
          if (count == this.account.length - 1) {
            this.isLoading = false;
          }
        })
      }
      console.log(this.account, 'accountss');

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0)
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.username.toLocaleLowerCase().includes(filter)
      }
    }),
      error => this.isLoading = false
  }

  ngOnInit(): void {
    this.getAdminCredential();
    this.getTeacher();
  }

  openModal(account) {
    this.updateAccountControl.adviser = account.adviser[0].firstName + account.adviser[0].middleName +account.adviser[0].lastName
    console.log( this.updateAccountControl.adviser)
    this.updateTeacherAdvisory=[]
    var count = 1;
    this.otherList.forEach(data => {
      this.updateTeacherAdvisory.push(data)
      count++;
      if (count === this.otherList.length) {
        console.log(count, this.otherList.length , 'counttttt')
        this.updateAccountControl.username = account.acc.username
        this.updateAccountControl.password = account.acc.password
        const oldTeacher = { _id: account.acc.adviser, firstName: account.adviser[0].firstName, middleName: account.adviser[0].middleName, lastName: account.adviser[0].lastName }
        this.updateTeacherAdvisory.push(oldTeacher)
        this.display = "block";
      }
    });
    console.log(account)
    console.log(this.updateTeacherAdvisory, 'updateTeacherAdvisory')
    console.log(this.otherList, 'otherList')
  }
  onCloseHandled() {
    this.display = "none";
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
      confirmPassword: "",
      role: "Admin",
    }
  }

  // Get Teacher 
  getTeacher(): void {
    this.authService.findAdviser().subscribe((data: any) => {
      this.otherList = data
      console.log(data);
    })
  }
  // 



  // Update Admin
  updateAdmin() {
    this.authService.updateCredentials(this.addAccountControl).subscribe(data => {
      if (data) {
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

  loginBtn() {
    this.authService.login(this.loginControl).subscribe(
      data => {
        this.updateAdmin()
        this.swal.succesAlert()
        this.display2 = "none"
      }, error => {
        this.swal.credentialsDidNotMatch()
      }
    );
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
        this.display2 = "block"
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
