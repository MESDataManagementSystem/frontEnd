import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddSectionComponent } from './add-section.component';
import { SectionService } from '../services/section.service';

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
  kinder: Card[] = [
    {
      totalSections: 2,
      totalStudents: 40,
      gradeLevel: '4'
    },
    // {
    //   totalSections: 4,
    //   totalStudents: 100,
    //   gradeLevel: '1'
    // },
    // {
    //   totalSections: 4,
    //   totalStudents: 110,
    //   gradeLevel: '2'
    // },
    // {
    //   totalSections: 3,
    //   totalStudents: 130,
    //   gradeLevel: '3'
    // },
    // {
    //   totalSections: 3,
    //   totalStudents: 140,
    //   gradeLevel: '4'
    // },
    // {
    //   totalSections: 5,
    //   totalStudents: 240,
    //   gradeLevel: '5'
    // },
    // {
    //   totalSections: 3,
    //   totalStudents: 120,
    //   gradeLevel: '6'
    // },
  ]


  constructor(
    private dialog: MatDialog, private service : SectionService
  ) {
    this.grade = "";
    this.kinder;
    this.gradeLevel = ['Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6',]
  }

  ngOnInit(): void { }

  // Dialog For Adding Teacher
  openDialog(): void {
    this.dialog.open(AddSectionComponent, { disableClose: true });
  }

  selectedGrade(grade){
    this.sections=[];
    console.log(grade.index);
    this.grade = grade.index;
    if(grade.index === 0){
      this.grade = "Kindergarten"
    }else{
      this.grade = "Grade " + grade.index;
    }
    this.viewSections();
    console.log(this.grade);
  }

  viewSections(){
    alert(this.grade)
    this.service.viewSections(this.grade).subscribe(data=> {this.sections =  data; this.sections = this.sections.data; console.log( this.sections, "service data")})
  }

}



