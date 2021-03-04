import { Component, OnInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SectionService } from '../services/section.service';
import { StudentServiceService } from '../services/student-service.service';

import { Router } from '@angular/router';
import { AddSectionComponent } from './add-section.component';



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
  section: string;
  // @Output()
  // selected: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private dialog: MatDialog, private sectionService: SectionService, private studentService: StudentServiceService, private router: Router
  ) {
    this.grade = 'Kindergarten';
    this.gradeLevel = ['Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'];
    this.section = '';
  }

  ngOnInit(): void {
    this.viewSections();
  }


  // Dialog For Adding section
  openDialog(): void {
    this.dialog.open(AddSectionComponent, { disableClose: true });
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
    this.sectionService.viewSections(this.grade).subscribe(data => {
      this.sections = data; this.sections = this.sections.data;
      console.log(this.sections, 'service data');
    });
  }

  viewStudents(section): void {
    alert(section);
    this.section = section;
    const datum = [section];
    this.sectionService.getSection(datum).subscribe(data => { console.log(data, 'section'); });
    // this.router.navigateByUrl('/MES/classes/student');
    this.router.navigate(['/MES/classes/student', section]);
  }

  // send section to child component (students in specific section)
  // select(section): void {
  //   this.selected.emit(section);
  // }

}



