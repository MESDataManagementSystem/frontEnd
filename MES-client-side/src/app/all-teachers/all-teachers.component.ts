import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';
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

  constructor(private teacherService: TeacherServiceService, private dialog: MatDialog) {
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

  openDialog(): void {
    this.dialog.open(DialogComponent, { disableClose: true });
  }

}