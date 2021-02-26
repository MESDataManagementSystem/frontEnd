import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { SectionService } from '../services/section.service';
import { TeacherServiceService } from '../services/teacher-service.service';
import { Teacher } from '../all-teachers/teacher.model';

@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.css']
})
export class AddSectionComponent implements OnInit {

  optionsControl = new FormControl();
  options: string[] = ['Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'];
  teacherList: any
  otherList = []
  filteredOptions: Observable<string[]>;
  error = new FormControl('', [Validators.required]);
  classesForm = {
    gradeLevel: "",
    sectionName: "",
    adviser: ""
  }

  constructor(
    private sectionService: SectionService,
    private dialog: MatDialog,
    private teacherService: TeacherServiceService
  ) {
  }

  ngOnInit() {
    this.getTeacher()
    this.filteredOptions = this.optionsControl.valueChanges.pipe(
      startWith(''),
      map(value => this.gradeLevel(value))
    );
  }

  // For gradeLevel Options
  private gradeLevel(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0)
  }

  // All Fields Are Required 
  getErrorMessage() {
    if (this.error.hasError('required')) {
      return 'You must enter a value';
    }
  }

  // Add Section
  addSection() {
    // console.log(this.classesForm)
    this.sectionService.addTeacher(this.classesForm).subscribe((data) => {
      if (data) {
        this.succesAlert();
        this.dialog.closeAll();
        window.location.reload();
      }
    })
  }

  // Get Teacher
  getTeacher() {
    this.teacherService.getAllTheTeachersList().subscribe(data => {
      if (data) {
        this.teacherList = data;
        this.teacherList = this.teacherList.data
        this.teacherList.forEach(data => {
          this.otherList.push(data)
        });

      }
    })
  }

  // Alert After Successful Adding Section
  succesAlert() {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Your Work Has Been Saved',
      showConfirmButton: false,
      timer: 1500
    })
  }

}
