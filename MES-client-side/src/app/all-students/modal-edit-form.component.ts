import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { StudentServiceService } from '../services/student-service.service';
import { SwalService } from '../services/swal.service';
import { Router } from '@angular/router';



// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
import { FileInput } from 'ngx-material-file-input';

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
  focused = false
  srcResult: any
  displayFile = true
  displayDate = true
  date1: any
  date: any = new FormControl()
  chosenDate: number = null
  maxDate = new Date();
  fullName: string;
  lrn: string;
  year: any;
  fileUrl: any;
  studentId: any;
  notEditedUrl: any;
  error = new FormControl('', [Validators.required]);
  fileToUpload: File = null;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EditFiles,
    private service: StudentServiceService,
    private swal: SwalService,
    public router: Router
  ) {
    // this.year = '';
  }

  ngOnInit(): void { 
    if (this.data) {
      console.log(this.data, 'arigato');

      this.notEditedUrl = this.data[0]
      this.year = this.data[3]
      this.fullName = this.data[2]
      this.lrn = this.data[1]
      this.fileUrl = this.data[0]
      var f = this.fileUrl.split('/')
      console.log(this.fileUrl, 'filename');
      this.fileUrl = new FileInput([f[4]])
      this.data[0] = f[4]
      this.fileUrl = this.data[0]
      this.studentId = this.data[4]
      var x = this.year;
      var y: number = +x;
      // this.year = y
    }
    
  }

  log() {

    console.log(this.fileUrl)
  }

  showFolder() {
    this.displayFile = false
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

  // updateStudent(){
  //   // if()
  // }

  updateStudent(file) {
    // if(this.year != this.date1){
      //  this.year = this.date1
      
      this.fileUrl = 'http://localhost:5000/uploads/';
      if (!(typeof this.year == 'number')) {
        var parts = this.year.toString().split(' ')
        this.year = parts[3]
      }
    // }else{
     
    // }
    // alert(this.year +" : "+ )
    if(this.year == undefined){
      this.year = this.data[3]
    }
      
    if (this.fullName.trim() && this.lrn && this.year) {
      // if(this.fileToUpload != null){
        if (file) {
          const formData = new FormData();
          formData.append('files', this.fileToUpload, this.fileToUpload.name);
          formData.append('fullName', this.fullName);
          formData.append('lrn', this.lrn);
          formData.append('date', this.year);
          formData.append('fileUrl', this.fileUrl);
          formData.append('id', this.studentId);
          console.log(formData, 'formdataaa')
          formData.forEach(data => {
            console.log(data, 'dataaa');
            return data
          });
          if (this.fileToUpload.name.split('.').pop() == 'pdf') {
            this.service.updateStudentFormFile(formData).subscribe(data => {
              if (data) {
                this.reloadComponent();
                this.swal.succesAlert()
                // this.dialogRef.close()
                console.log(data, 'result')
              }
            })
          } else {
            this.swal.errorAlertForPDFFile()
          }
        } else {
          this.fileUrl = this.notEditedUrl;
          var datas = {fullName: this.fullName, lrn: this.lrn, date: this.year, fileUrl: this.fileUrl, id: this.studentId}
          this.service.updateStudentForm(datas).subscribe(data => {
            if (data) {
              this.reloadComponent();
              this.swal.succesAlert()
              //  this.dialogRef.close()
              console.log(data, 'result')
            }
          })
          // this.swal.errorAlertForAllFieldsAreRequired()
        }
      // }
    } else {
      this.swal.errorAlertForAllFieldsAreRequired()
    }
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload, 'file');
  } 

  reloadComponent(): void {
    const currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

}

export interface EditFiles {
  fileUrl: string,
  lrn: string,
  fullName: string,
  date: string
}