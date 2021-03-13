import { Component, ViewChild, OnInit } from '@angular/core';
import { StudentServiceService } from '../services/student-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddFormDialogComponent } from './modal-add-form.component';
import { ModalViewFormComponent } from './modal-view-form.component';
import { ModalEditFormComponent } from './modal-edit-form.component';
import { FormControl } from '@angular/forms';
import { filter } from 'rxjs/operators';

export interface OldFiles {
  fullName: string;
  lrn: string;
  fileUrl: string;
  date: string;
}


@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css']
})
export class AllStudentsComponent implements OnInit {

  lrnFilter = new FormControl();
  nameFilter = new FormControl();
  searchByYear = "";
  filteredValues = {
    lrn: "",
    fullName: "",
  }

  searchLrn = '';
  // name = '';
  lrn = true;
  date = '';
  typeSearch: string;
  selectedFiles: File;

  students: any;
  dataSource: MatTableDataSource<any>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  columnsToDisplay: string[] = ['lrn', 'name', 'edit', 'view'];

  constructor(
    private service: StudentServiceService,
    private dialog: MatDialog
  ) {
    this.typeSearch = 'LRN';
    this.service.retrieveData().subscribe(data => {
      this.students = data
      this.dataSource = new MatTableDataSource<any>(this.students.data)
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0)
    })
  }

  ngOnInit() {
    this.lrnFilter.valueChanges.subscribe(lrnFilterValue => {
      this.filteredValues["lrn"] = lrnFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    })
    this.nameFilter.valueChanges.subscribe(nameFilterValue => {
      this.filteredValues["name"] = nameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      // console.log("unsa ni", this.dataSource.filter)

    })
      , () => {
        this.dataSource.filterPredicate = this.customFilter()
      }

  }

  customFilter() {
    let myFilterPredicate = function (data, filter: string): boolean {
      let searchString = JSON.parse(filter)
      searchString = data.includes(filter)
      return (
        data.lrn
          .toString()
          .trim()
          .indexOf(searchString.lrn) !== -1
        &&
        data.fullName
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(searchString.fullName.toLowerCase()) !== -1
      )
    }
    return myFilterPredicate;
  }

  yearFilter(filter) {
    this.searchByYear = filter;
    this.dataSource.filter = filter.trim().toLocaleLowerCase();
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.date.toLocaleLowerCase().includes(filter)
    }
  }

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
    })
  }

  filterFullName(value: string): void {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.fullName.toLocaleLowerCase().includes(filter)
    }
  }

  filterLrn(value: string): void {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.lrn.toLocaleLowerCase().includes(filter);
    }
  }

  filterYear(value: string): void {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.date.toLocaleLowerCase().includes(filter)
    }
  }

}
