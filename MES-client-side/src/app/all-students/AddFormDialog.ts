import { Component } from '@angular/core';
import { StudentServiceService } from '../services/student-service.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-fom-dialog',
  templateUrl: 'add-fom-dialog.html',
  styleUrls: ['./add-dialog-form.css']
})
// tslint:disable-next-line:component-class-suffix
export class AddFormDialog {
  firstName: string;
  middleName: string;
  lastName: string;
  lrn: string;
  constructor(private service: StudentServiceService, private dialogRef: MatDialogRef<AddFormDialog>) {
    this.firstName = 'Irish';
    this.middleName = 'Solatorio';
    this.lastName = 'Rufo';
    this.lrn = '18106242';
  }
  close(): void {
    this.dialogRef.close();
  }

}
