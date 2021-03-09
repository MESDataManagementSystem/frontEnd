import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { StudentServiceService } from '../services/student-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';

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
  constructor(private service: StudentServiceService, private dialog: MatDialog, private location: Location) {
    this.value = '';
    this.typeSearch = 'LRN';
    this.dataSource = new MatTableDataSource<any>(this.students);
    this.service.retrieveData().subscribe(student => {
      this.students = student.data;
      this.dataSource = new MatTableDataSource<any>(this.students);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
  }

  ngAfterViewInit(): void {
  }

  backClicked(): void {
    this.location.back();
  }

}
