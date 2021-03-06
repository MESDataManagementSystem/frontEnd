import { Component, OnInit } from '@angular/core';
import { StudentServiceService } from '../services/student-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  teachers = 15;
  students = 675;
  public chartType = 'horizontalBar';
  datas = ['60', '51', '58', '56', '52', '58', '55'];

  public chartDatasets: Array<any> = [
    { data: this.datas , label: 'Population of Students in each grade Level' }
  ];

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

  constructor(private studentService: StudentServiceService) {
    this.grade = ['Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'];

  }

  ngOnInit(): void {
    // this.chartLabels.forEach(element => {
    //   console.log('element', element);
    //   this.studentService.findGrade(element).subscribe(data => {
    //     console.log(data, 'datass:: ');
    //     this.datas.push(data.data.length);
    //   });
    // });
  }
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }


}
