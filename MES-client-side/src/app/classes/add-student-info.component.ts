import { SectionService } from './../services/section.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { StudentServiceService } from '../services/student-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';




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
    studentCredentialPresentedForGrade1: [],
    studentNameOfSchoolFromKinder: '',
    studentSchoolId: '',
    studentSchoolAddress: '',
    studentPeptPasserRating: '',
    studentDateOfxamination: '',
    studentOthers: [],
    studentNameAdressOfTestingCenter: '',
    studentRemark: '',
    studentSection: '',
    studentGrade: ''
  };
  studentSubject = {
    studentId: '',
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
    quarter: '',
    section: '',
    grade: '',
    currentGrade: ''
  };
  graduating = false;
  datas: any;
  sections = [];
  section: any;
  grade: any;
  updatedGrade: string;
  update = false;
  returnData: any;
  disableSelect = new FormControl(false);
  editStudentInfo = '';
  addGradesModal = false;
  addGrades = false;
  updateGradesButton = false;
  activeQuarters = [];
  selectGradeSection = false;
  disabledQuarterButtons = { quarter1: false, quarter2: true, quarter3: true, quarter4: true };

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  // tslint:disable-next-line:max-line-length
  constructor(private service: StudentServiceService, @Inject(MAT_DIALOG_DATA) public data: Section, public dialog: MatDialog, public sectionService: SectionService) {
    this.grade = this.data[2];
    console.log(this.data, '::dataaaa ni siya;;');
    this.studentId = this.data[0];
    if (this.data[3] === 'editStudentInfo') {
      this.editStudentInfo = 'editStudentInfo';
    } else if (this.data[3] === 'editStudentGrade') {
      this.findQuarter();
      this.editStudentInfo = 'editStudentGrade';
    } else if (this.data[3] === '') {
      this.editStudentInfo = 'editStudentInfo';
    } else if (this.data[3] === 'selectGradelevel') {
      this.editStudentInfo = 'selectGradelevel';
      if (this.grade === 'Kindergarten') {
        this.updatedGrade = 'Grade 1';
      }
      if (this.grade === 'Grade 1') {
        this.updatedGrade = 'Grade 2';
      }
      if (this.grade === 'Grade 2') {
        this.updatedGrade = 'Grade 3';
      }
      if (this.grade === 'Grade 3') {
        this.updatedGrade = 'Grade 4';
      }
      if (this.grade === 'Grade 4') {
        this.updatedGrade = 'Grade 5';
      }
      if (this.grade === 'Grade 5') {
        this.updatedGrade = 'Grade 6';
      }
      if (this.grade === 'Grade 6') {
        this.updatedGrade = 'Graduated!';
        this.graduating = true;
      }
    }
    this.returnData = data;
    this.section = this.data[0];
    // this.studentInfo.studentGrade = this.returnData.data[2];
    this.studentInfo.studentSection = this.section;
    this.studentInfo.studentGrade = this.grade;
    this.quarter = '';
    this.studentSubject.grade = this.grade;
    this.studentSubject.section = this.data[4];
    this.studentSubject.currentGrade = this.grade;
  }

  ngOnInit(): void {
    if (this.returnData[1] === 'fake') {
      this.update = false;
    } else {
      this.service.findStudent(this.section).subscribe(data => {
        this.update = true;
        // console.log(data, 'datass:::');
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
  succesAlert(Text, Icon, Timer): void {
    Swal.fire({
      icon: Icon,
      title: 'Message',
      text: Text,
      showConfirmButton: false,
      timer: Timer
    });
  }

  // For Gender Options
  private gender(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  updateStudent(): void {
    this.service.updateStudent(this.studentInfo).subscribe(data => {
      if (data.status === true) {
        this.succesAlert('Updated Student In  formation Successfully!', 'success', 1500);
        this.dialog.closeAll();
      }
      if (data.status === false) {
        this.succesAlert(`Can't Update Student Information. Please check fields!`, 'error', 2000);
      }
      console.log(data, 'return ni siya');
    });
  }

  addStudent(): void {
    console.log(this.studentInfo);
    this.service.addStudent(this.studentInfo).subscribe(data => {
      // tslint:disable-next-line:no-conditional-assignment
      if (data.error) {
        this.succesAlert('Fill in all the required fields!', 'error', '');
      }

      if (data.msg === 'LRN already exists!') {
        this.succesAlert('LRN ' + this.studentInfo.studentLRN + ' already exists!', 'error', 2000);
        this.studentInfo.studentLRN = '';
      }
      if (data.msg === 'Student Added!') {
        this.succesAlert('Added New Student Successfully', 'success', 1500);
        this.dialog.closeAll();
      }
      console.log(data);
    });
  }


  addCredential(data): void {
    if (this.studentInfo.studentCredentialPresentedForGrade1.includes(data)) {
      const index = this.studentInfo.studentCredentialPresentedForGrade1.indexOf(data);
      this.studentInfo.studentCredentialPresentedForGrade1.splice(index, 1);
    } else {
      this.studentInfo.studentCredentialPresentedForGrade1.push(data);
    }
    console.log(this.studentInfo.studentCredentialPresentedForGrade1, 'list ni sya');
  }

  chooseQuarter(): void {
    if (this.quarter) {
      this.findStudentGrades();
      console.log(this.studentId);
      this.addGrades = true;
      this.addGradesModal = true;
    } else {
      this.succesAlert('Please choose a quarter.', 'info', 1500);
    }

  }

  findStudentGrades(): void {

    const datum = { id: this.data[0], quarter: this.quarter, grade: this.grade, section: this.data[4] };
    console.log(datum, 'datummsski');
    this.service.findStudentGrades(datum).subscribe(data => {
      if (data.data) {
        this.updateGradesButton = true;
        this.studentSubject = data.data;
      }
      console.log(data, 'addGrades');
    });
  }

  addStudentGrades(): void {
    this.studentSubject.studentId = this.data[0];
    this.studentSubject.quarter = this.quarter;
    console.log(this.studentSubject, 'added')
    if (!this.updateGradesButton) {
      this.service.addStudentGrades(this.studentSubject).subscribe(data => {
        console.log(data.data, 'grades added');
        if (data.status === false) {
          this.succesAlert('All fields are required!', 'info', 2000);
        }
        if (data.data) {
          this.succesAlert(this.studentInfo.studentLastName + '\'s grades for' + this.quarter + ' added!', 'success', 1500);
          this.dialog.closeAll();
        }
      });
    } else {
      this.service.updateStudentGrades(this.studentSubject).subscribe(data => {
        console.log(data);
        if (data.status === false) {
          this.succesAlert('Can\'t Update Student Information. Please check fields!', 'error', 2000);
        } else if (data.status === true) {
          this.succesAlert(this.studentInfo.studentLastName + '\'s Grades Updated!', 'success', 1500);
          this.dialog.closeAll();
        }
      });
    }
  }

  findQuarter(): void {
    const datas = { id: this.data[0], grade: this.grade, section: this.data[4] };
    console.log(datas, 'datasss')
    this.service.findQuarter(datas).subscribe(data => {
      console.log(data.data, 'return sa find quarter');
      const dataLength = data.data.length;
      for (let i = 0; i < dataLength; i++) {
        console.log(i);
        console.log(data.data[i].quarter);
        this.activeQuarters.push(data.data[i].quarter);
      }
      console.log(this.activeQuarters, 'active quarters');
      if (this.activeQuarters.indexOf('Quarter 1') > -1) {
        this.disabledQuarterButtons.quarter2 = false;
      }
      if (this.activeQuarters.indexOf('Quarter 2') > -1) {
        this.disabledQuarterButtons.quarter3 = false;
      }
      if (this.activeQuarters.indexOf('Quarter 3') > -1) {
        this.disabledQuarterButtons.quarter4 = false;
      }
    });
  }

  chooseSection(): void {
    this.sectionService.viewSections(this.updatedGrade).subscribe((data: any) => {
      console.log(data.data, 'sections');
      data.data.forEach(section => {
        this.sections.push(section.sectionName);
      });
      if (this.sections.length === data.data.length) {
        this.selectGradeSection = true;

      }
      // this.sections = data.data;
      // console.log(this.sections, 'service data');
      // console.log(this.sections[0], 'section zero');
      // if (this.sections.length === data.data.length) {
      //   this.isLoading = false;
      // }
    });
  }
  // proceedNextGrade(id): void{

  // }
  choosenSection(): void {
    // if(!this.graduating){
    console.log(this.data[0], this.grade, this.section, '::: gradessss');
    this.datas = { id: this.data[0], grade: this.grade, currentGrade: this.updatedGrade, section: this.section };
    this.service.nextGrade(this.datas).subscribe(data => {
      if (data.status) {
        this.succesAlert('Successfully added to section ' + this.section + ' ' + this.updatedGrade, 'success', 1500);
        this.dialog.closeAll();
      } else {
        this.succesAlert(data.error, 'error', 2000);
        this.dialog.closeAll();
      }
      console.log(data, 'response sa server update grade level');
    });

  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add others for student
    if ((value || '').trim()) {
      this.studentInfo.studentOthers.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(others: any): void {
    const index = this.studentInfo.studentOthers.indexOf(others);

    if (index >= 0) {
      this.studentInfo.studentOthers.splice(index, 1);
    }
  }

}

export interface Section {
  section: string;
  fake: false;
  grade: string;
}
