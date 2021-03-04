import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-modal-edit-form',
  templateUrl: './modal-edit-form.component.html',
  styleUrls: ['./modal-edit-form.component.css']
})
export class ModalEditFormComponent implements OnInit {

  fullName: string;
  lrn: string;
  fileUrl: string;
  error = new FormControl('', [Validators.required]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EditFiles,

  ) { }

  ngOnInit(): void {
    if (this.data) {
      console.log("Sdafasd",this.data[0])
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


}

export interface EditFiles{
  fileUrl: string,
  lrn: string,
  fullName: string
}