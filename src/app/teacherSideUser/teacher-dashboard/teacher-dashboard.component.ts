import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {
  sections: any;
  user: any;
  viewGrade: string;
  viewSection: string;
  viewStudentsSection= false;
  constructor(private router: Router, private authService: AuthServiceService, private teacherService: TeacherServiceService) {
    this.user = this.authService.user;
    this.teacherService.findAdviser(this.user.id.adviser).subscribe((data:any ) => {
      console.log(data)
      this.sections = data.data
      // data.data.forEach(section => {
      //   this.sections.push(section.sections)
      //   // console.log(section.gradeLevel)
      // });
    })
   }

  ngOnInit(): void {
    // console.log(this.user.id.adviser);
  }

  selectedGrade(event){
    console.log(this.user, 'useeeerrr');
    
  }
  logout(){
    window.localStorage.clear();
    this.router.navigate(['/login'])
  }
  viewStudents(grade, section){
    this.viewGrade = grade;
    this.viewSection = section;
    this.viewStudentsSection = !this.viewStudentsSection;
    this.router.navigate(['teacher/dashboard/class/',grade, section])  
  }
  
}
