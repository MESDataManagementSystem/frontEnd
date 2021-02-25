import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { StudentServiceService } from '../services/student-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddFormDialogComponent } from './modal-add-form.component';
import { ModalViewFormComponent } from './modal-view-form.component';
import { MatMenuModule } from '@angular/material/menu';





@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css']
})
export class AllStudentsComponent implements AfterViewInit {
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


  constructor(private service: StudentServiceService, private dialog: MatDialog) {
    this.value = '';
    this.typeSearch = 'LRN';
    this.dataSource = new MatTableDataSource<any>(this.students);
    this.service.retrieveData().subscribe(student => {
      this.students = student.data;
      this.dataSource = new MatTableDataSource<any>(this.students);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
      // tslint:disable-next-line:only-arrow-functions
    });
  }


  ngAfterViewInit(): void {}
  openDialog(): void {
    this.dialog.open(AddFormDialogComponent, { disableClose: true });
    console.log(this.typeSearch);
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

  showFile(url, name): void {
    console.log(url);
    const datas = [];
    datas.push(url);
    datas.push(name);
    // tslint:disable-next-line:max-line-length
    console.log('daataaa :::: ', datas);
    this.dialog.open(ModalViewFormComponent, { disableClose: true, data: datas , width: '100vw !important',  height: '100% !important'});
    console.log(this.typeSearch);
  }

  filterFullName(value: string): void {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    // tslint:disable-next-line:only-arrow-functions
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.fullName.toLocaleLowerCase().includes(filter);
    };
  }
  filterLrn(value: string): void {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    // tslint:disable-next-line:only-arrow-functions
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.lrn.toLocaleLowerCase().includes(filter);
    };
  }

}

