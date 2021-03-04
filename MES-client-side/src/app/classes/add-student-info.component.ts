import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { StudentServiceService } from '../services/student-service.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
  selector: 'app-add-student-info',
  templateUrl: './add-student-info.component.html',
  styleUrls: ['./add-student-info.component.css']
})


export class AddStudentInfoComponent implements OnInit {
  maxDate = new Date();
  error = new FormControl('', [Validators.required]);
  optionsControl = new FormControl();
  options: string[] = ['M', 'F'];
  filteredOptions: Observable<string[]>;
  studentInfo = {
    studentLastName: '',
    studentFirstName: '',
    studentNameExtn: '',
    studentMiddleName: '',
    studentLRN: '',
    studentBirthdate: '',
    studentSex: '',
    studentCredentialPresentedForGrade: [],
    studentNameOfSchoolFromKinder: '',
    studentSchoolId: '',
    studentSchoolAddress: '',
    studentPeptPasserRating: '',
    studentDateOfxamination: '',
    studentOthers: '',
    studentNameAdressOfTestingCenter: '',
    studentRemark: '',
    studentSection: ''
  };
  section: any;
  constructor(private service: StudentServiceService, @Inject(MAT_DIALOG_DATA) public data: Section) {
    console.log(this.data, '::dataaaa ni siya;;');
    this.section = this.data;
    this.studentInfo.studentSection = this.section;
  }

  ngOnInit(): void {
    this.filteredOptions = this.optionsControl.valueChanges.pipe(
      startWith(''),
      map(
        value => this.gender(value)
      )
    );
  }
  getErrorMessage(): string {
    if (this.error.hasError('required')) {
      return 'You must enter a value';
    }
  }

  // Alert After Successful Adding Student's Info
  succesAlert(): void {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Your Work Has Been Saved',
      showConfirmButton: false,
      timer: 1500
    });
  }

  // For Gender Options
  private gender(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  addStudent(): void {
    alert('student added successfully !!' + this.studentInfo.studentSection);
    this.service.addStudent(this.studentInfo).subscribe(data => {console.log(data); });
  }
  addCredential(data): void {
    if (this.studentInfo.studentCredentialPresentedForGrade.includes(data)) {
      alert('equal sila');
      const index = this.studentInfo.studentCredentialPresentedForGrade.indexOf(data);
      this.studentInfo.studentCredentialPresentedForGrade.splice(index, 1);
    } else {
      this.studentInfo.studentCredentialPresentedForGrade.push(data);
      alert(' dili equal sila');
    }
    console.log(this.studentInfo.studentCredentialPresentedForGrade, 'list ni sya');
  }

}
export interface Section {
  section: string;
}
