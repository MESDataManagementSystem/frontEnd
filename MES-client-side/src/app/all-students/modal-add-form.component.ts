import { Component, OnInit } from '@angular/core';
import { StudentServiceService } from '../services/student-service.service';
import { SwalService } from '../services/swal.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-add-form',
  templateUrl: './modal-add-form.component.html',
  styleUrls: ['./modal-add-form.component.css']
})
export class AddFormDialogComponent implements OnInit {
  fullName: string;
  lrn: string;
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

}



