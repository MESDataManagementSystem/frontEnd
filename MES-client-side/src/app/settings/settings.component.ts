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
  teacherNoAccount: [];
  teacherHasAccount:any[] = []
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
    adviser: "",
    role: "Teacher"
  }

  account: any[] = [];
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
      this.account = data.data
      this.dataSource = new MatTableDataSource<any>(this.account)
      console.log(this.account, 'dataaa');
      
      // this.account.forEach(teacher => {
      //   console.log(teacher.adviser, 'dataaa sa account')
      //   this.authService.findTeacher(teacher.adviser).subscribe((teacher:any) =>{
      //     this.account.forEach(account => {
      //       if(account.adviser.includes(teacher))
      //     });
      //     //  if(this.account.includes())
      //     console.log(this.account,'accounts');
          
      //     this.teacherHasAccount.push(teacher.data)
      //   })
      // });
      for(let i =0; i< this.account.length; i++){
          this.authService.findTeacher(this.account[i].adviser).subscribe((teacher:any) =>{
          this.account.forEach(account => {
            // if(account.adviser.includes(teacher))
            this.account[i] = {acc: account, adviser: teacher}
          });
          //  if(this.account.includes())
          console.log(this.account,'accounts');
          
          this.teacherHasAccount.push(teacher.data)
        })
      }
      // this.authService.findTeacher
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
    console.log("hola ", data.adviser)
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
      console.log("datum", datum)
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
    this.teacherService.getAllTheTeachersList('yes').subscribe((data:any) => {
      if (data) {
        this.teacherList = data.data;
        this.teacherList.forEach(data => {
          this.otherList.push(data);
        })
      }
    })
  }
  // 

  // show Teacher Option
  teacherNoAccounts(){
    // otherList.forEach(element => {
      
    // });
  }

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
        // console.log("ASdfasd", data)
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
        // Swal.fire('Saved!', '', 'success')
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
