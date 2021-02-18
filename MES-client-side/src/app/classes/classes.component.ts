import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})


export class ClassesComponent implements OnInit {
  // for grade1
  grade1Sections =  '5';
  grade1Students = '100';
  // for grade2
  grade2Sections =  '50';
  grade2Students = '1000';
  // for grade3
  grade3Sections =  '500';
  grade3Students = '10000';
  // for grade4
  grade4Sections =  '500';
  grade4Students = '10000';
  // for grade5
  grade5Sections =  '500';
  grade5Students = '10000';
  // for grade6
  grade6Sections =  '500';
  grade6Students = '10000';


  grade1: ColumnsForGrades[] = [
    {text: '1', cols: 1, rows: 3, color: 'white', fontsize: '50px'},
    {text: 'Total sections : ' + this.grade1Sections, cols: 3, rows: 1, color: 'white', fontsize: '20px' },
    {text: 'Total Students : ' + this.grade1Students, cols: 3, rows: 1, color: 'white', fontsize: '20px' },
    {text: 'View Sections', cols: 3, rows: 1, color: 'white', fontsize: '20px' },
  ];
  grade2: ColumnsForGrades[] = [
    {text: '2', cols: 1, rows: 3, color: 'white', fontsize: '50px' },
    {text: 'Total sections : ' + this.grade2Sections, cols: 3, rows: 1, color: 'white', fontsize: '20px' },
    {text: 'Total Students : ' + this.grade2Students, cols: 3, rows: 1, color: 'white', fontsize: '20px' },
    {text: 'View Sections', cols: 3, rows: 1, color: 'white', fontsize: '20px' },
  ];
  grade3: ColumnsForGrades[] = [
    {text: '3', cols: 1, rows: 3, color: 'white', fontsize: '50px' },
    {text: 'Total sections : ' + this.grade3Sections, cols: 3, rows: 1, color: 'white', fontsize: '20px' },
    {text: 'Total Students : ' + this.grade3Students, cols: 3, rows: 1, color: 'white', fontsize: '20px' },
    {text: 'View Sections', cols: 3, rows: 1, color: 'white', fontsize: '20px' },
  ];
  grade4: ColumnsForGrades[] = [
    {text: '4', cols: 1, rows: 3, color: 'white', fontsize: '50px' },
    {text: 'Total sections : ' + this.grade4Sections, cols: 3, rows: 1, color: 'white', fontsize: '20px' },
    {text: 'Total Students : ' + this.grade4Students, cols: 3, rows: 1, color: 'white', fontsize: '20px' },
    {text: 'View Sections', cols: 3, rows: 1, color: 'white', fontsize: '20px' },
  ];
  grade5: ColumnsForGrades[] = [
    {text: '5', cols: 1, rows: 3, color: 'white', fontsize: '50px' },
    {text: 'Total sections : ' + this.grade5Sections, cols: 3, rows: 1, color: 'white', fontsize: '20px' },
    {text: 'Total Students : ' + this.grade5Students, cols: 3, rows: 1, color: 'white', fontsize: '20px' },
    {text: 'View Sections', cols: 3, rows: 1, color: 'white', fontsize: '20px' },
  ];
  grade6: ColumnsForGrades[] = [
    {text: '6', cols: 1, rows: 3, color: 'white', fontsize: '50px'},
    {text: 'Total sections : ' + this.grade6Sections, cols: 3, rows: 1, color: 'white', fontsize: '17px'},
    {text: 'Total Students : ' + this.grade6Students, cols: 3, rows: 1, color: 'white', fontsize: '17px'},
    {text: 'View Sections', cols: 3, rows: 1, color: 'white', fontsize: '20px'},
  ];

  grades = [this.grade1, this.grade2, this.grade3, this.grade4, this.grade5, this.grade6];
  gradesIndex = [0, 1, 2, 3, 4, 5];
  constructor() { }

  ngOnInit(): void {
    this.grades.forEach(grade => {
      this.gradesIndex.forEach(index => {
      console.log(this.grades[0][0]);
      });
    });
    // console.log(this.grades[1][0].text);
  }

}

export interface ColumnsForGrades {
  color: string;
  cols: number;
  rows: number;
  text: string;
  fontsize: string;
}

