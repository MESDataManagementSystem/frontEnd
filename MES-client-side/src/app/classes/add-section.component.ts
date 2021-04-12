import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, startWith } from 'rxjs/operators';
import { SectionService } from '../services/section.service';
import { TeacherServiceService } from '../services/teacher-service.service';
import { SwalService } from '../services/swal.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.css']
})
export class AddSectionComponent implements OnInit {
  addStudent= false;
  hideOverlay = true;
  minDate = new Date()
  maxDate: Date;
  optionsControl = new FormControl();
  options: string[] = ['Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'];
  teacherList: any;
  otherList = [];
  teacherId = '';
  filteredOptions: Observable<string[]>;
  error = new FormControl('', [Validators.required]);
  classesForm = {
    gradeLevel: '',
    sectionName: '',
    year: '',
    adviser: ''
  };
  updateAdviserList = []

  constructor(
    private sectionService: SectionService,
    private dialog: MatDialog,
    private teacherService: TeacherServiceService,
    private swal: SwalService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public router: Router
  ) {
    this.getTeacher();
    const currentDate = new Date().getFullYear();
    this.maxDate = new Date(currentDate + 1, 11, 31)
    if(this.data === 'addSection'){
      this.addStudent = true;
    }
  }

  ngOnInit(): void {
    this.classesForm.year = this.minDate.getFullYear()+ ' - '+this.maxDate.getFullYear()
    
    this.filteredOptions = this.optionsControl.valueChanges.pipe(
      startWith(''),
      map(value => this.gradeLevel(value))
    );
   
    console.log(this.otherList, ' ... teacherlist')
  }

  // For gradeLevel Options
  private gradeLevel(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  // All Fields Are Required 
  getErrorMessage(): string {
    if (this.error.hasError('required')) {
      return 'You must enter a value';
    }
  }

  // Add Section
  addSection(): void {
    const data = { ...this.classesForm, adviser: this.teacherId };
    console.log(data);
    this.sectionService.addTeacher(data).subscribe((data) => {
      if (data) {
        this.reloadComponent();
        this.swal.succesAlert()
        this.dialog.closeAll();
      }
    });
  }
  // update section
  updateSection(){
    // console.log(this.teacherId)
    let datas = {_id: this.data.data._id, adviser:this.teacherId}
    this.sectionService.updateSection(datas).subscribe(data => {
      if(data){
        this.reloadComponent();
        this.swal.succesAlert()
        this.dialog.closeAll();
      }
      
    })
  }

  // Get Teacher
  getTeacher(): void {
    this.teacherService.getAllTheTeachersList('yes').subscribe(data => {
      if (data) {
        this.teacherList = data;
        this.teacherList = this.teacherList.data;
        this.teacherList.forEach(data => {
          this.otherList.push(data);
        })
      }
    })
  }
  reloadComponent(): void {
    const currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

}
