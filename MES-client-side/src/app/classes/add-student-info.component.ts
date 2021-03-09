import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { StudentServiceService } from '../services/student-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-add-student-info',
  templateUrl: './add-student-info.component.html',
  styleUrls: ['./add-student-info.component.css']
})


export class AddStudentInfoComponent implements OnInit {
  quarter: string;
  studentId: string;
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
    studentSection: '',
    studentGrade: ''
  };
  studentSubject = {
    lrn: '',
    motherTongue: '',
    filipino: '',
    english: '',
    mathematics: '',
    science: '',
    aralingPanlipunan: '',
    eppTle: '',
    Mapeh: '',
    music: '',
    pe: '',
    arts: '',
    health: '',
    edukasyonSaPagpapakatao: '',
    arabicLanguage: '',
    islamicLanguage: '',
    quarter: ''
  };
  section: any;
  grade: any;
  update = false;
  returnData: any;
  disableSelect = new FormControl(false);
  editStudentInfo = '';
  addGradesModal = false;
  addGrades = false;
  constructor(private service: StudentServiceService, @Inject(MAT_DIALOG_DATA) public data: Section) {
    console.log(this.data, '::dataaaa ni siya;;');
    this.studentId = this.data[0];
    if (this.data[3] === 'editStudentInfo'){
      this.editStudentInfo = 'editStudentInfo';
    }else if (this.data[3] === 'editStudentGrade'){
      this.editStudentInfo = 'editStudentGrade';
    }
    this.returnData = data;
    this.section = this.data[0];
    this.grade = this.data[2];
    // this.studentInfo.studentGrade = this.returnData.data[2];
    this.studentInfo.studentSection = this.section;
    this.studentInfo.studentGrade = this.grade;
    this.quarter = '';
  }

  ngOnInit(): void {
    if (this.returnData[1] === 'fake') {
      alert(this.section);
      this.update = false;
    } else {
      alert(this.section);
      this.service.findStudent(this.section).subscribe(data => {
        this.update = true;
        console.log(data, 'datass:::');
        this.studentInfo = data.data;
        console.log(this.studentInfo);
      });
    }
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
    this.service.addStudent(this.studentInfo).subscribe(data => { console.log(data); });
  }
  updateStudent(): void {
    this.service.updateStudent(this.studentInfo).subscribe(data => { console.log(data, 'return ni siya'); });
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

  chooseQuarter(): void {
    // this.quarter = option;
    alert(this.quarter);
    console.log( this.studentId);
    this.addGrades = true;
    this.addGradesModal = true;
    // this.editStudentInfo = false;
  }
  addStudentGrades(): void{
    alert('added Student!');
  }

}
export interface Section {
  section: string;
  fake: false;
  grade: string;
}
