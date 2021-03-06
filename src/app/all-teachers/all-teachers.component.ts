import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';
import { ViewComponent } from './view.component';
import { Teacher } from './teacher.model';
import { TeacherServiceService } from '../services/teacher-service.service';

@Component({
  selector: 'app-all-teachers',
  templateUrl: './all-teachers.component.html',
  styleUrls: ['./all-teachers.component.css']
})
export class AllTeachersComponent implements OnInit {

  isLoading = true;
  search: string;
  public showActive: boolean = false;
  teacherData: any = [];
  dataSource: MatTableDataSource<Teacher>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['employeeNumber', 'lastName', 'firstName', 'middleName', 'view'];

  constructor(
    private teacherService: TeacherServiceService,
    private dialog: MatDialog
  ) {
    this.search = ''
    this.viewTeacher('yes');
  }

  ngOnInit() {
    
  }


  // Dialog For Adding Teacher
  openDialog(): void {
    this.dialog.open(DialogComponent, { disableClose: true });
  }

  // Dialog For View Teacher's Info And Updating Teacher's Info
  openDialogView(teacher: Teacher): void {
    this.dialog.open(ViewComponent, {
      disableClose: true,
      data: teacher,
      autoFocus: false
    });
  }

  // Search Specific Teacher
  filter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  viewTeacher(status) {
    this.hideShow()
  }

  hideShow() {
    var count = 0;
    if (this.showActive) {
      this.showActive = false
      this.teacherService.getAllTheTeachersList('no').subscribe(data => {
        this.teacherData = data;
        this.dataSource = new MatTableDataSource<Teacher>(this.teacherData.data);
        for (let i = 0; i < this.teacherData.data.length; i++) {
          count = i;
          if (count == this.teacherData.data.length - 1) {
            this.isLoading = false;
          }
        }
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0)
        this.dataSource.filterPredicate = function (data, filter: string): boolean {
          return data.lastName.toLocaleLowerCase().includes(filter)
        }
      })
      error => this.isLoading = false
    } else {
      this.showActive = true
      this.teacherService.getAllTheTeachersList('yes').subscribe(data => {
        this.teacherData = data;
        this.dataSource = new MatTableDataSource<Teacher>(this.teacherData.data);
        for (let i = 0; i < this.teacherData.data.length; i++) {
          count = i;
          if (count == this.teacherData.data.length - 1) {
            this.isLoading = false;
          console.log(this.teacherData)

          }
        }
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0)
        this.dataSource.filterPredicate = function (data, filter: string): boolean {
          return data.lastName.toLocaleLowerCase().includes(filter)
        }
      })
      error => this.isLoading = false
    }
  }

}