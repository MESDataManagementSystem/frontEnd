import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map, startWith } from 'rxjs/operators';
import { SectionService } from '../services/section.service';
import { TeacherServiceService } from '../services/teacher-service.service';
import { SwalService } from '../services/swal.service';
import { Observable } from 'rxjs';
// import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
// import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
// import { MatDatepicker } from '@angular/material/datepicker';

// import * as _moment from 'moment';
// import { default as _rollupMoment, Moment } from 'moment';
// const moment = _rollupMoment || _moment;

// export const YEAR_MODE_FORMATS = {
//   parse: {
//     dateInput: 'YYYY',
//   },
//   display: {
//     dateInput: 'YYYY',
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// };

@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.css'],
  // providers: [
  //   {
  //     provide: DateAdapter,
  //     useClass: MomentDateAdapter,
  //     deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  //   },

  //   { provide: MAT_DATE_FORMATS, useValue: YEAR_MODE_FORMATS },
  // ],
})
export class AddSectionComponent implements OnInit {

  // date = new FormControl(moment());
  
  // chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
  //   const ctrlValue = this.date.value;
  //   ctrlValue.year(normalizedYear.year());
  //   this.date.setValue(ctrlValue);
  //   datepicker.close();
  // }

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

  constructor(
    private sectionService: SectionService,
    private dialog: MatDialog,
    private teacherService: TeacherServiceService,
    private swal: SwalService
  ) {
    const currentDate = new Date().getFullYear();
    this.maxDate = new Date(currentDate + 1, 11, 31)
    console.log(this.minDate,this.maxDate)
  }

  ngOnInit(): void {
    this.classesForm.year = this.minDate.getFullYear()+ ' - '+this.maxDate.getFullYear()
    // alert(this.minDate.getFullYear()+ ' sdafasdsdafsdfasdfafsd '+this.maxDate.getFullYear())
    this.getTeacher();
    this.filteredOptions = this.optionsControl.valueChanges.pipe(
      startWith(''),
      map(value => this.gradeLevel(value))
    );
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
        this.swal.succesAlert()
        this.dialog.closeAll();
      }
    });
  }

  // Get Teacher
  getTeacher(): void {
    this.teacherService.getAllTheTeachersList().subscribe(data => {
      if (data) {
        this.teacherList = data;
        this.teacherList = this.teacherList.data;
        this.teacherList.forEach(data => {
          this.otherList.push(data);
        })
      }
    })
  }

}
