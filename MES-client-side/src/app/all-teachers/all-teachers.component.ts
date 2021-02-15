import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Teacher } from './teacher.model';
import { TeacherServiceService } from '../services/teacher-service.service';

@Component({
  selector: 'app-all-teachers',
  templateUrl: './all-teachers.component.html',
  styleUrls: ['./all-teachers.component.css']
})
export class AllTeachersComponent implements OnInit {

  searchFilter: string;
  teacherData: any = [];
  dataSource: MatTableDataSource<Teacher>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['employeeNumber', 'lastName', 'firstName', 'middleName', 'view'];

  constructor(private teacherService: TeacherServiceService) {
    this.searchFilter = '';
    this.teacherService.getAllTheTeachersList().subscribe(data => {
      this.teacherData = data;
      this.dataSource = new MatTableDataSource<Teacher>(this.teacherData.data);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })
  }

  ngOnInit() { }

}