import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  username: string;
  email: string
  password: string;

  constructor() { 
    this.username = "Admin1"
    this.password = "***********"
    this.email = "admin@gmail.com"
  }

  ngOnInit(): void {
  }
}

