import { AuthServiceService } from './../services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SwalService } from '../services/swal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: string;
  pass: string;
  hide = true;
  error = new FormControl('', [Validators.required]);
  error2 = new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])
  loginCred = {
    username: '',
    password: ''
  }

  constructor(
    private router: Router,
    private service: AuthServiceService,
    private swal: SwalService,
  ) {
  }

  ngOnInit(): void {
  }

  loginBtn() {
    this.service.login(this.loginCred).subscribe(
      data => {
        console.log("ASdfasd",data)
        this.router.navigate(['/MES']);
        
      }, error => {
        this.swal.credentialsDidNotMatch()
      }
    );
  }


  // All Fields Are Required 
  getErrorMessage() {
    if (this.error.hasError('required')) {
      return 'You must enter a value';
    }
  }

  // Password Error 
  getErrorMessage2() {
    if (this.error.hasError('required')) {
      return 'Password must contain at least 1 uppercase, 1 lowercase, numbers and special characters';
    }
  }

}
