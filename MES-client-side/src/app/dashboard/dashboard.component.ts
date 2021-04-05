import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentServiceService } from '../services/student-service.service';
import { DateRange } from '@angular/material/datepicker';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  teachers = 15;
  students = 675;
  public chartType = 'bar';
  // datas = [];
  load: boolean;
  datas: any;
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
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  grade: any;
  isLoading = true;
  constructor(private studentService: StudentServiceService, private router: Router) {
    this.grade = ['Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'];
    this.load = false;
    this.studentService.populationStudents().subscribe(data => {
      this.datas = data.population;
      console.log(this.datas, 'datass');
      this.chartDatasets = [
        { data: this.datas, label: 'Population of Students in each grade Level' }

      ];
      this.isLoading = false;
    },
      error => {
        console.log('error');
      });


  }

  ngOnInit(): void {
  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  // tslint:disable-next-line:arrow-return-shorthand
  // let hello = async () => { return "Hello" };

  // alert = async () => {
  //   return this.datas;
  //   this.chartLabels.forEach(element => {
  //     console.log('element', element);
  //     this.studentService.findGrade(element).subscribe(data => {
  //       this.datas.push(data.data.length + '');
  //       console.log('' + data.data.length + '');
  //     });
  //   });
  //   if (this.datas.length === 7) {
  //     // this.load = true;
  //   }
  // }

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



}
