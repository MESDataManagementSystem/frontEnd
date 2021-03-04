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

  teacherData: any = [];
  dataSource: MatTableDataSource<Teacher>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['employeeNumber', 'lastName', 'firstName', 'middleName', 'view'];

  constructor(
    private teacherService: TeacherServiceService,
    private dialog: MatDialog
  ) {
    this.teacherService.getAllTheTeachersList().subscribe(data => {
      this.teacherData = data;
      this.dataSource = new MatTableDataSource<Teacher>(this.teacherData.data);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0)
      this.dataSource.filterPredicate = function (data, filter: string): boolean {
        return data.lastName.toLocaleLowerCase().includes(filter)
      }
    })

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


}