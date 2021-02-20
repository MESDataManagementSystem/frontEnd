import { Component, OnInit } from '@angular/core';
import { StudentServiceService } from '../services/student-service.service';
import {MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-modal-add-form',
  templateUrl: './modal-add-form.component.html',
  styleUrls: ['./modal-add-form.component.css']
})
export class AddFormDialogComponent implements OnInit {
  fullName: string;
  lrn: string;
  fileToUpload: File = null;
  constructor( private dialogRef: MatDialogRef<AddFormDialogComponent>, private service: StudentServiceService) {
    this.fullName = '';
    this.lrn = '';
  }

  ngOnInit(): void {
  }
  close(): void {
    this.dialogRef.close();
    console.log(this.fullName, this.lrn);
  }

  addStudent(file): void {
    console.log('submitted', this.fileToUpload);
    const formData = new FormData();
    // formData.append('file', this.fileToUpload, this.fileToUpload.name);
    formData.append('files', this.fileToUpload, this.fileToUpload.name);
    formData.append('name', this.fullName);
    formData.append('lrn', this.lrn);
    formData.forEach(data => {
        console.log('data sa formdata : ', data);
    });
    this.service.studentForm(formData).subscribe(data => console.log('mao ni return nitya', data));
  }
  handleFileInput(files: FileList): void  {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
  }

}


