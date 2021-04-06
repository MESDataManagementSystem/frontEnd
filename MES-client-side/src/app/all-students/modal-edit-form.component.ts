// import { Component, OnInit, Inject, VERSION } from '@angular/core';
// import { FormControl, Validators } from '@angular/forms';
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
// import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
// import { MatDatepicker } from '@angular/material/datepicker';

// @Component({
//   selector: 'app-modal-edit-form',
//   templateUrl: './modal-edit-form.component.html',
//   styleUrls: ['./modal-edit-form.component.css']
// })
// export class ModalEditFormComponent implements OnInit {
//   version = VERSION;
//   date = new Date();
//   maxDate = new Date();

//   visible = true;

//   fullName: string;
//   lrn: string;
//   // year: any;
//   fileUrl: string;
//   error = new FormControl('', [Validators.required]);

//   constructor(
//     @Inject(MAT_DIALOG_DATA) public data: EditFiles,

//   ) {
//     // this.year = '';
//   }

//   ngOnInit(): void {
//     if (this.data) {
//       console.log(this.data)
//       this.date = this.data[3]
//       this.fullName = this.data[2]
//       this.lrn = this.data[1]
//       this.fileUrl = this.data[0]
//     }
//   }

//   // All Fields Are Required 
//   getErrorMessage() {
//     if (this.error.hasError('required')) {
//       return 'You must enter a value';
//     }
//   }

// }

// export interface EditFiles {
//   fileUrl: string,
//   lrn: string,
//   fullName: string, 
//   date: string
// }



import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-modal-edit-form',
  templateUrl: './modal-edit-form.component.html',
  styleUrls: ['./modal-edit-form.component.scss'],
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

export class ModalEditFormComponent implements OnInit {

  displayDate = true
  date1: any
  date: any = new FormControl()
  chosenDate: number = null
  maxDate = new Date();
  fullName: string;
  lrn: string;
  year: any;
  fileUrl: string;
  error = new FormControl('', [Validators.required]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EditFiles,

  ) {
    this.year = '';
  }

  ngOnInit(): void {
    if (this.data) {
      console.log(this.data)
      this.date1 = this.data[3]
      this.fullName = this.data[2]
      this.lrn = this.data[1]
      this.fileUrl = this.data[0]
    }
  }

  // All Fields Are Required 
  getErrorMessage() {
    if (this.error.hasError('required')) {
      return 'You must enter a value';
    }
  }

  chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
    this.displayDate = false
    this.chosenDate = normalizedYear.year()
    this.date = new FormControl(moment())
    let ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.year = ctrlValue.year();
    this.chosenDate = ctrlValue
    console.log(ctrlValue.year(), 'year ni siya')
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

}

export interface EditFiles {
  fileUrl: string,
  lrn: string,
  fullName: string,
  date: string
}