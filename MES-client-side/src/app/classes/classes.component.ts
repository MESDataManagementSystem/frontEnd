import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SectionService } from '../services/section.service';
import {Router} from '@angular/router';
import { AddStudentInfoComponent } from './add-student-info.component';


export interface Card {
  totalSections, totalStudents: number;
  gradeLevel: string;
}

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class ClassesComponent implements OnInit {
  grade: string;
  sections: any;
  gradeLevel: any;


  constructor(
    private dialog: MatDialog, private service: SectionService, private router: Router
  ) {
    this.grade = 'Kindergarten';
    this.gradeLevel = ['Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'];
  }

  ngOnInit(): void {
    this.viewSections();
  }

  // Dialog For Adding Student
  openDialog(): void {
    this.dialog.open(AddStudentInfoComponent, { disableClose: true });
  }

  selectedGrade(grade): void {
    this.sections = [];
    console.log(grade.index);
    this.grade = grade.index;
    if (grade.index === 0) {
      this.grade = 'Kindergarten';
    } else {
      this.grade = 'Grade ' + grade.index;
    }
    this.viewSections();
    console.log(this.grade);
  }

  viewSections(): void {
    this.service.viewSections(this.grade).subscribe(data => {
      this.sections = data; this.sections = this.sections.data;
      console.log(this.sections, 'service data');
    });
  }

  viewStudents(): void{
    this.router.navigateByUrl('/MES/classes/student');
  }

}



