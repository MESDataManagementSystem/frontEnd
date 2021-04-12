import { Component, OnInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SectionService } from '../services/section.service';
import { StudentServiceService } from '../services/student-service.service';

import { Router } from '@angular/router';
import { AddSectionComponent } from './add-section.component';



export interface Card {
  totalSections; totalStudents: number;
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
  isLoading = false;
  sectionPopulation: [];
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
    this.dialog.open(AddSectionComponent, { disableClose: true, data: 'addSection' });
  }

  selectedGrade(grade): void {
    // this.viewSections();
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
    this.sectionService.viewSections(this.grade).subscribe((data: any) => {
      const datas = [];
      let count = 0;
      this.sections = data.data;
      this.sectionPopulation = data.population;
      console.log(data, 'service data');
      console.log(this.sections[0], 'section zero');
      this.sections.forEach(element => {
        // if(this.section.sectionName)
        this.sectionPopulation.forEach((pop: any) => {
          if (element.sectionName === pop.section) {
            datas.push({ section: element, population: pop.population });
            count++;
            if (count === this.sections.length) {
              console.log(datas, 'datas');
              this.sections = datas;
            }
          }
        });

      });
      // if (this.sections.length === data.data.length) {
      //   this.isLoading = false;
      // }
    });
  }

  viewStudents(section): void {
    // alert(section);
    this.section = section;
    const datum = [section];
    this.sectionService.getSection(datum).subscribe(data => { console.log(data, 'section'); });
    // this.router.navigateByUrl('/MES/classes/student');
    this.router.navigate(['/MES/classes', this.grade, section]);
  }

  editAdviser(sectionId, ln, fn, mn, adviserId): void {
    // alert(id);
    let datas = {data:{_id: sectionId,
      lastName: ln,
      firstName: fn,
      middleName: mn},
      adviserId: adviserId
    }
    this.dialog.open(AddSectionComponent, { disableClose: true, data: datas });
  }

  // send section to child component (students in specific section)
  // select(section): void {
  //   this.selected.emit(section);
  // }


}



