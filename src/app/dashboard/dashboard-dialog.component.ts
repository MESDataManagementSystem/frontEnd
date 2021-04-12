import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-dashboard-dialog',
  templateUrl: './dashboard-dialog.component.html',
  styleUrls: ['./dashboard-dialog.component.css']
})
export class DashboardDialogComponent implements OnInit {
  isLoading = true;
  search: string;
  teacherData: any = [];
  dataSource: MatTableDataSource<any>;
  advisory = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['employeeNumber', 'fullName'];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) {
    console.log(data);
    if (this.data[1] === 'nonAdvisory') {
      this.advisory = false;
      this.dataSource = new MatTableDataSource<any>(this.data[0].nonAdvisory);
      this.isLoading = false;
      // tslint:disable-next-line:align
    } setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 0);
    if (this.data[1] === 'advisory') {
      this.advisory = true;
      this.displayedColumns = ['employeeNumber', 'fullName', 'classes'];
      this.dataSource = new MatTableDataSource<any>(this.data[0].Advisory);
      this.isLoading = false;
      // tslint:disable-next-line:align
    } setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 0);
  }

  ngOnInit(): void {
  }
  closeDialog(): void {
    this.dialog.closeAll();
  }

}
export interface Teacher {
  employeeNumber: number;
  firstName: string;
  middleName: string;
  lastName: string;
  nameExt: string;

}
