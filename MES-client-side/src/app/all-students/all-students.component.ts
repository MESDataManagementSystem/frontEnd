import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { StudentServiceService } from '../services/student-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddFormDialogComponent } from './modal-add-form.component';
import { ModalViewFormComponent } from './modal-view-form.component';
import { ModalEditFormComponent } from './modal-edit-form.component';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css']
})
export class AllStudentsComponent implements AfterViewInit {

  searchLrn = '';
  name = '';
  lrn = true;
  viewFile = false;
  typeSearch: string;
  value: string;
  selectedFiles: File;
  
  students: any;
  dataSource: MatTableDataSource<any>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  columnsToDisplay: string[] = ['name', 'lrn', 'edit', 'view'];
 


  constructor(
    private service: StudentServiceService,
    private dialog: MatDialog
  ) {
    this.value = '';
    this.typeSearch = 'LRN';
    this.service.retrieveData().subscribe(data => {
      this.students = data
      this.dataSource = new MatTableDataSource<any>(this.students.data)
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })
  }


  ngAfterViewInit() { }

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

  editFile(url, lrn, name) {
    const datas = []
    datas.push(url);
    datas.push(lrn);
    datas.push(name);
    this.dialog.open(ModalEditFormComponent, {
      disableClose: true,
      data: datas,
      width: '100vw !important',
      height: '100% !important'
    });
  }

  filterFullName(value: string): void {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.fullName.toLocaleLowerCase().includes(filter);
    };
  }
  filterLrn(value: string): void {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.lrn.toLocaleLowerCase().includes(filter);
    };
  }
}
