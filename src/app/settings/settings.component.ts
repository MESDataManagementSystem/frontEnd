import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { AuthServiceService } from '../services/auth-service.service';
import { SwalService } from '../services/swal.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {

  error = new FormControl('', [Validators.required]);
  error2 = new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]);
  public buttonName: any = 'Click To Edit';
  hideOverlay = true;
  hide = true;
  hide1 = true;
  hide2 = true;
  hide3 = true;
  hide4 = true;
  hide5 = true;

  otherList = [];
  updateTeacherAdvisory = [];
  teacherHasAccount: any;
  teacherList: any;
  teacherId = '';
  search: string;
  display = 'none';
  display2 = 'none';
  display3 = 'none';
  display4 = 'none';

  loginControl = {
    username: '',
    password: '',
  };

  addAccountControl = {
    username: '',
    password: '',
    confirmPassword: '',
    role: 'Admin'
  };

  addAccountControl1 = {
    username: '',
    password: 'P@ssw0rd',
    adviser: '',
    role: 'Teacher'
  };

  updateAccountControl = {
    _id: '',
    username: '',
    password: '',
    confirmPassword1: '',
    role: 'Teacher'
  };

  isUpdate: string
  idDelete: string
  isLoading = true;
  count = 0;

  account: any[] = [];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['username', 'name', 'edit', 'delete'];

  constructor(
    private authService: AuthServiceService,
    private swal: SwalService,
    private router: Router
  ) {
    this.search = '';
    this.teacherWithAccount();
  }

  ngOnInit(): void {
    this.getAdminCredential();
    this.getTeacher();
  }

  // display list of teachers has account
  teacherWithAccount(){
    this.authService.viewListOfTeachersAccount('Teacher').subscribe((data: any) => {
      // let count = 0;
      var datasAccount = []
      this.account = data.data;
      this.account.forEach(acct => {
        this.authService.findTeacher(acct.adviser).subscribe((teacher: any) => {
          this.teacherHasAccount = teacher;
          acct = { acc: acct, adviser: this.teacherHasAccount };
          datasAccount.push(acct);
          this.dataSource = new MatTableDataSource<any>(datasAccount);
          this.count++
          console.log( this.count + ' ' + this.account.length)
          if (this.count === this.account.length) {
            this.isLoading = false;
            console.log(datasAccount)
          }
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
          }, 0);
          this.dataSource.filterPredicate = function (data, filter: string): boolean {
            return data.acc.username.toLocaleLowerCase().includes(filter)
          }
        });
      });
       if (this.account.length === 0) {
        this.isLoading = false
      }
    })
      // error => this.isLoading = false;
  }

  // Search Specific Teacher 
  filter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  // To Close The Modal
  onCloseHandled() {
    this.display = 'none';
    this.display2 = 'none';
    this.display3 = 'none';
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

  // *******************      Updating the teacher account with admin login for confirmation      *******************
  updateTeacherAccountBtn(id, username, password) {
    this.isUpdate = id
    this.authService.findAccount(id).subscribe(data => {
      if (data) {
        this.display = 'block';
        const datas = []
        datas.push(username)
        datas.push(password)
        this.updateAccountControl.username = username
        this.updateAccountControl.password = password
      }
    })
  }

  AlertBeforeUpdateTeacherAccount() {
    Swal.fire({
      icon: 'warning',
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      confirmButtonText: `Save`,
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.display = 'none';
        this.display4 = 'block';
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }

  loginBtnForUpdate() {
    if (this.loginControl.username == 'Administrator') {
      this.authService.loginAdminForConfirmation(this.loginControl).subscribe(data => {
        if (data) {
          this.updateTeacherAccount();
          this.swal.succesAlert();
          this.display4 = 'none';
        }
      });
    } else {
      this.swal.credentialsDidNotMatch()
    }
  }

  updateTeacherAccount() {
    this.updateAccountControl._id = this.isUpdate
    this.authService.updateTeacherAccount(this.updateAccountControl).subscribe(data => {
      if (data) {
        console.log(data, 'arigatoooo')
        this.reloadComponent();
        // this.teacherWithAccount();
      }
    })
  }
  // *******************      -----------------------------------------------------------------------      *******************

  // *******************      Updating the admin password with admin login for confirmation      *******************
  updateAdmin() {
    this.authService.updateCredentials(this.addAccountControl).subscribe(data => {
      if (data) {
        console.log("skemperloww")
      }
    });
  }

  warningAlert() {
    Swal.fire({
      icon: 'warning',
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      confirmButtonText: `Save`,
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.display2 = 'block';
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }

  loginBtn() {
    if (this.loginControl.username == 'Administrator') {
      this.authService.loginAdminForConfirmation(this.loginControl).subscribe(data => {
        if (data) {
          this.updateAdmin()
          this.swal.succesAlert();
          this.display2 = 'none'
        }
      });
    } else {
      this.swal.credentialsDidNotMatch()
    }
  }
  // *******************      -----------------------------------------------------------------------      *******************

  // *******************      Removing the account of specific teacher with admin login for confirmation      *******************
  removeAccount(id) {
    this.idDelete = id
    Swal.fire({
      icon: 'question',
      title: 'Are you sure?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: 'red',
    }).then((result) => {
      if (result.isConfirmed) {
        this.display3 = 'block'
      }
    })
  }

  loginBtnForDelete() {
    if (this.loginControl.username == 'Administrator') {
      this.authService.loginAdminForConfirmation(this.loginControl).subscribe(data => {
        this.authService.deleteAccount(this.idDelete).subscribe(data => {
          if (data) {
            console.log("delete daw ni")
            this.swal.succesAlert();
            this.display3 = 'none'
          }
        })
      });
    } else {
      this.swal.credentialsDidNotMatch()
    }
  }
  // *******************      -----------------------------------------------------------------------      *******************

  // Get Teacher with no account and display in the input field for making an account for teacher
  getTeacher(): void {
    this.authService.findAdviser().subscribe((data: any) => {
      this.otherList = data;
    });
  }

  // Adding Account For Teacher
  addAccountTeacher() {
    const data = { ...this.addAccountControl1, adviser: this.teacherId };
    this.authService.register(data).subscribe(data => {
      if (data) {
        this.swal.succesAlert();
        this.reloadComponent();
      } else {
        this.swal.errorAlertForSomethingWentWrong();
      }
    });
  }

  // Getting The Credentials Of The Admin
  getAdminCredential() {
    this.authService.getCredentials('Admin').subscribe((data: any) => {
      const datum = data.data;
      if (data) {
        this.addAccountControl = datum;
      }
    });
  }

  reloadComponent(): void {
    const currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

}
