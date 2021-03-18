import { AuthServiceService } from './../services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private router: Router, private service: AuthServiceService) { }

  ngOnInit(): void {
  }
  login(): void {
    const form = JSON.stringify(this.credentials.value);
    this.service.login(this.credentials.value).subscribe(
      data => {
        this.router.navigate(['/MES']);
      }, error => {
        alert("Something went rishasdfsdf")
      }

    );
    // this.router.navigateByUrl('/MES/dashboard');

  }
}
