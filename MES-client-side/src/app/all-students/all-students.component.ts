import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { StudentServiceService} from '../services/student-service.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AddFormDialogComponent } from '../Modals/modal-add-form.component';




@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css']
})
export class AllStudentsComponent implements AfterViewInit {
  dataSource = new MatTableDataSource<Information>(studentData);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  typeSearch: string;
  value: string;
  students: any;
  selectedFiles: File;
  columnsToDisplay: string[] = ['name', 'lrn', 'view'];


  constructor( private service: StudentServiceService, private dialog: MatDialog) {
       this.value = '';
       this.typeSearch = 'LRN';
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.service.retrieveData().subscribe( student => { this.students = student; });
    console.log(this.students);
  }
  openDialog(): void {
    this.dialog.open(AddFormDialogComponent,  { disableClose: true });
    console.log(this.typeSearch);
  }
  // tslint:disable-next-line:member-ordering

  selectFile(event): void {
    this.selectedFiles = event.target.files;
}
  csvInputChange(fileInputEvent: any): void {
    console.log(fileInputEvent.target.files[0]);
  }
}

export interface Information {
  name: string;
  lrn: string;
}
const studentData: Information[] = [ {name: 'Irish Rufo', lrn: '18106242'}, {name: 'Ma. Theresa Amaquin', lrn: '123456'}, {name: 'Yubert Mariscal', lrn: '456788'}, {name: 'Annabelle Belcina', lrn: '45678'}, {name: 'Irish Rufo', lrn: '18106242'}, {name: 'Ma. Theresa Amaquin', lrn: '123456'}, {name: 'Yubert Mariscal', lrn: '456788'}, {name: 'Annabelle Belcina', lrn: '45678'}, {name: 'Irish Rufo', lrn: '18106242'}, {name: 'Ma. Theresa Amaquin', lrn: '123456'}, {name: 'Yubert Mariscal', lrn: '456788'}, {name: 'Annabelle Belcina', lrn: '45678'}, {name: 'Irish Rufo', lrn: '18106242'}, {name: 'Ma. Theresa Amaquin', lrn: '123456'}, {name: 'Yubert Mariscal', lrn: '456788'}, {name: 'Annabelle Belcina', lrn: '45678'}];

