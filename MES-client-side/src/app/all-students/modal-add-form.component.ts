import { Component, OnInit } from '@angular/core';
import { StudentServiceService } from '../services/student-service.service';
import { SwalService } from '../services/swal.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};


@Component({
  selector: 'app-modal-add-form',
  templateUrl: './modal-add-form.component.html',
  styleUrls: ['./modal-add-form.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AddFormDialogComponent implements OnInit {

  date = new FormControl(moment());
  maxDate = new Date();
  fullName: string;
  lrn: string;
  year: any;
  fileToUpload: File = null;
  fileUrl: string;
  error = new FormControl('', [Validators.required]);

  constructor(
    private dialogRef: MatDialogRef<AddFormDialogComponent>,
    private service: StudentServiceService,
    private swal: SwalService
  ) {
    this.fullName = '';
    this.lrn = '';
    this.year = '';
    this.fileUrl = 'http://localhost:5000/uploads/';
  }

  ngOnInit() {
  }

  addStudent(file) {
    if (this.fullName.trim() && this.lrn.trim()) {
      if (file) {
        const formData = new FormData();
        formData.append('files', this.fileToUpload, this.fileToUpload.name);
        formData.append('fullName', this.fullName);
        formData.append('lrn', this.lrn);
        formData.append('date', this.year);
        formData.append('fileUrl', this.fileUrl);
        formData.forEach(data => {
          return data
        });
        if (this.fileToUpload.name.split('.').pop() == 'pdf') {
          this.service.studentForm(formData).subscribe(data => {
            if (data) {
              this.swal.succesAlert()
              this.dialogRef.close()
            }
          })
        } else {
          this.swal.errorAlertForPDFFile()
        }
      } else {
        this.swal.errorAlertForAllFieldsAreRequired()
      }
    } else {
      this.swal.errorAlertForAllFieldsAreRequired()
    }
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  // All Fields Are Required 
  getErrorMessage() {
    if (this.error.hasError('required')) {
      return 'You must enter a value';
    }
  }

  chosenYearHandler(normalizedYear: Moment,datepicker: MatDatepicker<Moment>) {
    let ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.year = ctrlValue.year();
    console.log(ctrlValue.year(), 'year ni siya')
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

}



