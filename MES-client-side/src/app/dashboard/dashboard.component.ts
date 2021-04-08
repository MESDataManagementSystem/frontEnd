import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentServiceService } from '../services/student-service.service';
import { TeacherServiceService } from '../services/teacher-service.service';
import { DateRange } from '@angular/material/datepicker';
import { DashboardDialogComponent } from './dashboard-dialog.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  teachers = 15;
  students = 675;
  public chartType = 'bar';
  totalNumberofStudents = 0;
  totalNumberofNonAdvisory = 0;
  totalNumberofAdvisory = 0;
  totalNumberofTeachers = 0;
  // datas = [];
  load: boolean;
  datas: any;
  teachersAdvisory: any;
  teachersNonAdvisory: any;
  public chartDatasets: Array<any>;
  public chartLabels: Array<any> = ['Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'];

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'grey'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'black'
      ],
      borderWidth: 1,
    }
  ];

  public chartOptions: any;
  grade: any;
  isLoading = true;
  schoolYear: string;
  // tslint:disable-next-line:max-line-length
  constructor(private studentService: StudentServiceService, private dialog: MatDialog, private router: Router, private teacherService: TeacherServiceService) {
    this.grade = ['Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'];
    this.load = false;
    this.studentService.populationStudents().subscribe(data => {
      this.datas = data.population;
      console.log(this.datas, 'datass');
      this.chartDatasets = [
        { data: this.datas, label: 'Population of Students in each grade Level' }
      ];
      this.chartOptions = {
        responsive: true,
        scales: {
          yAxes: [{ id: 'y-axis-1', type: 'linear', position: 'left', ticks: { min: 0, max: Math.max(...this.datas) } }]
        }
      };
      this.totalNumberofStudents = this.datas.reduce((a, b) => a + b, 0);
      this.teacherService.teacherPopulation().subscribe((teachers: any) => {
        console.log(teachers);
        this.totalNumberofAdvisory = teachers.data[0].advisory;
        this.totalNumberofTeachers = teachers.data[1].allTeachers;
        this.totalNumberofNonAdvisory = teachers.data[2].nonAdvisory;
        this.schoolYear = teachers.schoolYear;
        this.teachersAdvisory = teachers.advisory;
        this.teachersNonAdvisory = teachers.nonAdvisory;
        this.isLoading = false;
      });
    },
      error => {
        console.log('error');
      });


  }

  ngOnInit(): void {
  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }


  // tslint:disable-next-line:typedef
  icon1() {
    alert('display the list of all the advisory teachers');
  }

  // tslint:disable-next-line:typedef
  icon2() {
    alert('display the list of all the non advisory teachers');
  }

  // tslint:disable-next-line:typedef
  icon3() {
    alert('display the list of all section per grade level with total students');
  }

  // tslint:disable-next-line:typedef
  icon4() {
    this.router.navigate(['/MES/teachers']);
  }
  openDialog(type): void {
    const datas = [{ Advisory: this.teachersAdvisory, nonAdvisory: this.teachersNonAdvisory }, type];
    this.dialog.open(DashboardDialogComponent, {
      disableClose: true,
      data: datas,
      width: '100vw !important',
      height: '100% !important'
    });
  }



}
