import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { StudentServiceService } from '../services/student-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { AddStudentInfoComponent } from './add-student-info.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { ModalViewFormComponent } from '../all-students/modal-view-form.component';



@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css']
})
export class ViewStudentsComponent implements OnInit {

  viewFile = false;
  value: string;
  selectedFiles: File;

  section: string;
  grade: string;

  typeSearch: string;
  lrn = true;

  students: any;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  columnsToDisplay: string[] = ['lrn', 'name', 'edit', 'view'];

  readonly formControl: AbstractControl;


  constructor(
    private service: StudentServiceService,
    private dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    formBuilder: FormBuilder
  ) {
    this.value = '';
    this.typeSearch = 'LRN';
    this.section = '';
    this.route.paramMap.subscribe(params => {
      this.section = params.get('section');
      this.grade = params.get('grade');
      if (this.section) {
        this.service.viewStudents(this.section).subscribe(data => {
          this.students = data;
          this.dataSource = new MatTableDataSource<any>(this.students.data);
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
          }, 0),
            console.log("arigato", this.students.data)
          this.dataSource.filterPredicate = ((data, filter) => {
            const lrnFilter = !filter.studentLRN || data.studentLRN.toString().toLowerCase().includes(filter.studentLRN);
            const name = !filter.studentLastName || data.studentLastName.toLowerCase().includes(filter.studentLastName);
            return lrnFilter && name;
          }) as (data, string) => boolean;
        })
      }
    })
    this.formControl = formBuilder.group({
      studentLRN: "",
      studentLastName: ""
    })
    this.formControl.valueChanges.subscribe(value => {
      const filter = {
        ...value,
        studentLastName: value.studentLastName.trim().toLowerCase()
      } as string;
      this.dataSource.filter = filter;
    })


  }

  ngOnInit(): void {

  }

  // Dialog For Adding Student
  openDialog(data, datas): void {
    console.log(datas, '::: datasss');
    let idf = '';
    if (datas === 'fake') {
      datas = this.section;
      idf = 'fake';
    }
    const datum = [datas, idf, this.grade, data];
    this.dialog.open(AddStudentInfoComponent, { disableClose: true, data: datum });
  }


  backClicked(): void {
    this.location.back();
  }
  showFile(): void {
    const url = 'http://localhost:4200/assets/images/form10_pdf.pdf';
    const datas = [];
    datas.push(url);
    this.dialog.open(ModalViewFormComponent, {
      disableClose: true,
      data: datas,
      width: '100vw !important',
      height: '100% !important'
    });
  }

  // filteredLrn(value: string) {
  //   this.dataSource.filter = value.trim().toLocaleLowerCase();
  //   this.dataSource.filterPredicate = function (data, filter: string): boolean {
  //     return data.lrn.toLocaleLowerCase().includes(filter)
  //   }
  // }

  // filteredName(value: string) {
  //   this.dataSource.filter = value.trim().toLocaleLowerCase();
  //   this.dataSource.filterPredicate = function (data, filter: string): boolean {
  //     return data.name.toLocaleLowerCase().includes(filter)
  //   }
  // }

}
