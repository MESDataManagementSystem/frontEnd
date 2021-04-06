import { Component, ViewChild, OnInit, VERSION } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { StudentServiceService } from '../services/student-service.service';
import { AddFormDialogComponent } from './modal-add-form.component';
import { ModalViewFormComponent } from './modal-view-form.component';
import { ModalEditFormComponent } from './modal-edit-form.component';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css']
})
export class AllStudentsComponent implements OnInit {

  version = VERSION;
  date = new Date();
  chosenYearDate: Date;
  maxDate = new Date();

  visible = true;

  lrn = true;
  typeSearch: string;
  selectedFiles: File;
  isLoading = true;

  students: any;
  dataSource: MatTableDataSource<any>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  columnsToDisplay: string[] = ['lrn', 'name', 'edit', 'view'];
  readonly formControl: AbstractControl;

  constructor(
    private service: StudentServiceService,
    private dialog: MatDialog,
    formBuilder: FormBuilder
  ) {
    this.typeSearch = 'LRN';
    this.service.retrieveData().subscribe(data => {
      this.students = data
      this.dataSource = new MatTableDataSource<any>(this.students.data)
      var count = 0;
      for (let i = 0; i < this.students.data.length; i++) {
        count = i;
        if (count == this.students.data.length - 1) {
          this.isLoading = false;
        }
      }
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0),
        this.dataSource.filterPredicate = ((data, filter) => {
          const lrnFilter = !filter.lrn || data.lrn.toLowerCase().includes(filter.lrn);
          const fullNameFilter = !filter.fullName || data.fullName.toLowerCase().includes(filter.fullName);
          const yearFilter = !filter.date || data.date.toLowerCase().includes(filter.date);
          return lrnFilter && fullNameFilter && yearFilter;
        }) as (data, string) => boolean;
    })
    error => this.isLoading = false

    this.formControl = formBuilder.group({
      lrn: "",
      fullName: "",
      date: ""
    });
    this.formControl.valueChanges.subscribe(value => {
      const filter = {
        ...value,
        fullName: value.fullName.trim().toLowerCase()
      } as string;
      this.dataSource.filter = filter;
    })

  }

  ngOnInit() { }

  openDialog(): void {
    this.dialog.open(AddFormDialogComponent, { disableClose: true });
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  csvInputChange(fileInputEvent: any): void {
    console.log(fileInputEvent.target.files[0]);
  }

  myFunction(event): void {
    alert(event);
  }

  showFile(url): void {
    const datas = [];
    datas.push(url);
    this.dialog.open(ModalViewFormComponent, {
      disableClose: true,
      data: datas,
      width: '100vw !important',
      height: '100% !important'
    });
  }

  editFile(url, lrn, name, date) {

    const datas = []
    datas.push(url);
    datas.push(lrn);
    datas.push(name);
    datas.push(date);
    this.dialog.open(ModalEditFormComponent, {
      disableClose: true,
      data: datas,
      width: '100vw !important',
      height: '100% !important'
    })
  }

}
