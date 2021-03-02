import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { StudentServiceService } from '../services/student-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import {Location} from '@angular/common';
import { AddStudentInfoComponent } from './add-student-info.component';


@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css']
})
export class ViewStudentsComponent implements AfterViewInit {
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  viewFile = false;
  typeSearch: string;
  value: string;
  students: any;
  selectedFiles: File;
  columnsToDisplay: string[] = ['name', 'lrn', 'view'];
  searchLrn = '';
  name = '';
  lrn = true;
  section: string;
  constructor(private service: StudentServiceService, private dialog: MatDialog, private location: Location) {
    this.value = '';
    this.typeSearch = 'LRN';
    this.dataSource = new MatTableDataSource<any>(this.students);
    this.service.viewStudents().subscribe(student => {
      this.students = student.data;
      this.dataSource = new MatTableDataSource<any>(this.students);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
      // tslint:disable-next-line:only-arrow-functions
    });
    this.service.viewStudents().subscribe(data => {console.log(data, 'datasss'); });
    this.section = '';
  }

  ngAfterViewInit(): void {
  }
  // Dialog For Adding Student
  openDialog(): void {
    this.dialog.open(AddStudentInfoComponent, { disableClose: true });
  }


  backClicked(): void {
    this.location.back();
  }

}
