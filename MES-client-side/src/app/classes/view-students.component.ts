import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { StudentServiceService } from '../services/student-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { AddStudentInfoComponent, Section } from './add-student-info.component';
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
  isLoading = true;
  section: string;
  grade: string;

  typeSearch: string;
  lrn = true;

  students: any;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  columnsToDisplay: string[] = ['lrn', 'name', 'edit', 'view', 'proceed'];

  readonly formControl: AbstractControl;

  constructor(
    private service: StudentServiceService,
    private dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute,
    formBuilder: FormBuilder
  ) {
    this.value = '';
    this.typeSearch = 'LRN';
    this.section = '';
    this.route.paramMap.subscribe(params => {
      this.section = params.get('section');
      this.grade = params.get('grade');
      if (this.section) {
        this.service.viewStudents(this.section, this.grade).subscribe(data => {
          this.students = data;
          this.dataSource = new MatTableDataSource<any>(this.students.data);
          var count = 0;
          if (this.students.data.length === 0) {
            this.isLoading = false;
          }
          for (let i = 0; i < this.students.data.length; i++) {
            count = i;
            if (count == this.students.data.length - 1) {
              this.isLoading = false;
            }
          }
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
    error => this.isLoading = false
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
    // datas = this.section
    const section = this.section;
    if (datas === 'fake') {
      datas = this.section;
      idf = 'fake';
    }
    const datum = [datas, idf, this.grade, data, section];
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


}
