import { Component, OnInit } from '@angular/core';
import { StudentService} from '../services/student.service';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css']
})
export class AllStudentsComponent implements OnInit {

  constructor( public studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.search('IRish').subscribe(res => {
      console.log(res);
    }, error => {
      alert(error);
      console.log(error);
    });
  }


}
