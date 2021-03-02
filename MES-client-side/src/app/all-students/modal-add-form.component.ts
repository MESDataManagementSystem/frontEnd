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
  fileUrl: string;
  constructor( private dialogRef: MatDialogRef<AddFormDialogComponent>, private service: StudentServiceService) {
    this.fullName = '';
    this.lrn = '';
    this.fileUrl = 'http://localhost:5000/uploads/';
  }

  ngOnInit(): void {
  }
  close(): void {
    this.dialogRef.close();
    console.log(this.fullName, this.lrn);
  }

  addStudent(file): void {
    if (this.fullName.trim() && this.lrn.trim()){
      console.log('submitted', this.fileToUpload);
      const formData = new FormData();
      formData.append('files', this.fileToUpload, this.fileToUpload.name);
      formData.append('fullName', this.fullName);
      formData.append('lrn', this.lrn);
      formData.append('fileUrl', this.fileUrl);
      formData.forEach(data => {
          console.log('data sa formdata : ', data);
      });
      this.service.studentForm(formData).subscribe(data => console.log('mao ni return nitya', data));
      this.close();
    }else{
      alert('please Fill in all the data needed.');
    }

  }
  handleFileInput(files: FileList): void  {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
  }

}



