import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
    private dialog: MatDialog
  ) {
    this.kinder
  }

  ngOnInit(): void { }

  // Dialog For Adding Teacher
  openDialog(): void {
    this.dialog.open(AddSectionComponent, { disableClose: true });
  }
}



