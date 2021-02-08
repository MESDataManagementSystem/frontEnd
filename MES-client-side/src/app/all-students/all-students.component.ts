import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css']
})
export class AllStudentsComponent implements OnInit {
  value: string;
  constructor() {
       this.value = '';
  }

  ngOnInit(): void {
  }

}
