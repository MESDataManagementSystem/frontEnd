import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { StudentServiceService } from '../services/student-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { Location } from '@angular/common';
import { AddStudentInfoComponent } from './add-student-info.component';
import { ActivatedRoute, Router } from '@angular/router';


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
  columnsToDisplay: string[] = ['name', 'lrn', 'edit', 'view'];
  searchLrn = '';
  name = '';
  lrn = true;
  section: string;
  grade: string;
  // tslint:disable-next-line:max-line-length
  constructor(private service: StudentServiceService, private dialog: MatDialog, private location: Location, private route: ActivatedRoute, private router: Router) {
    this.value = '';
    this.typeSearch = 'LRN';
    this.dataSource = new MatTableDataSource<any>(this.students);
    this.section = '';
  }

  ngAfterViewInit(): void {
    this.route.paramMap.subscribe(params => {
      this.section = params.get('section');
      this.grade = params.get('grade');
      if (this.section){
        this.service.viewStudents(this.section).subscribe(student => {
          this.students = student.data;
          this.dataSource = new MatTableDataSource<any>(this.students);
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
          }, 0);
          // tslint:disable-next-line:only-arrow-functions
        });
      }
    });
  }
  // Dialog For Adding Student
  openDialog(datas): void {
    console.log(datas, '::: datasss');
    let idf = '';
    if (datas === 'fake'){
      datas = this.section;
      idf = 'fake';
    }
    const datum = [datas, idf, this.grade];
    this.dialog.open(AddStudentInfoComponent, { disableClose: true, data: datum });
  }


  backClicked(): void {
    this.location.back();
  }

  alert(): void{
    alert('nice!');
  }

  // itemSelected(e): void {
  //   alert(e);
  // }

}
