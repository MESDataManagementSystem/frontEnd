import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { StudentServiceService } from '../services/student-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddFormDialogComponent } from '../Modals/modal-add-form.component';




@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css']
})
export class AllStudentsComponent implements AfterViewInit {
  // displayedColumns: string[] = ['name', 'lrn', 'view'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

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
  }


  ngAfterViewInit(): void {
    this.service.retrieveData().subscribe(student => { this.students = student; });
    this.dataSource = new MatTableDataSource<any>(this.students);

    this.dataSource.paginator = this.paginator;
    console.log(this.students);
  }
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

  searchByLrn(searchLrn): void {
    console.log('searchLrn', this.lrn);
    this.service.searchbyLRN(this.searchLrn).subscribe(info => { this.dataSource = new MatTableDataSource<any>(info); });
    console.log(this.students);
  }
  searchbyFamilyName(name): void {
    // console.log('name', this.lrn);
    // let searchName = '';
    // // tslint:disable-next-line:prefer-for-of
    // for (let i = 0; i < this.name.length; i++ ){
    //   if (this.name[i].match(/[a-z]/i)) {
    //       console.log(searchName);
    //       searchName += this.name[i];
    //    }else{
    //      continue;
    //    }
    // }
    // {
    this.service.searchbyFamilyName(this.name.toLowerCase()).subscribe(info => { this.dataSource = new MatTableDataSource<any>(info); });
    // }
    console.log(this.students);
  }
}


// export interface Information {
//   name: string;
//   lrn: string;
// }
// const studentData: Information[] = [{ name: 'Yubert Mariscal', lrn: '456788' }, { name: 'Annabelle Belcina', lrn: '45678' }];


