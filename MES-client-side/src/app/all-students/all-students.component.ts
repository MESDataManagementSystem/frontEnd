import { Component, OnInit } from '@angular/core';
import { StudentServiceService} from '../services/student-service.service';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css']
})
export class AllStudentsComponent implements OnInit {
  value: string;
  students: any;
  columnsToDisplay: string[] = ['name', 'lrn', 'view'];
  studentData = [ {name: 'Irish Rufo', lrn: '18106242'}, {name: 'Ma. Theresa Amaquin', lrn: '123456'}, {name: 'Yubert Mariscal', lrn: '456788'}, {name: 'Annabelle Belcina', lrn: '45678'},{name: 'Irish Rufo', lrn: '18106242'}, {name: 'Ma. Theresa Amaquin', lrn: '123456'}, {name: 'Yubert Mariscal', lrn: '456788'}, {name: 'Annabelle Belcina', lrn: '45678'},{name: 'Irish Rufo', lrn: '18106242'}, {name: 'Ma. Theresa Amaquin', lrn: '123456'}, {name: 'Yubert Mariscal', lrn: '456788'}, {name: 'Annabelle Belcina', lrn: '45678'},{name: 'Irish Rufo', lrn: '18106242'}, {name: 'Ma. Theresa Amaquin', lrn: '123456'}, {name: 'Yubert Mariscal', lrn: '456788'}, {name: 'Annabelle Belcina', lrn: '45678'}];
  dataSource = this.studentData;
  constructor( private service: StudentServiceService) {
       this.value = '';
  }

  ngOnInit(): void {
    this.service.retrieveData().subscribe( student => { this.students = student; });
    console.log(this.students);
  }


}
