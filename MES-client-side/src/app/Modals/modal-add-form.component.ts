import { Component, OnInit } from '@angular/core';
// import { StudentServiceService } from '../../../services/auth-service.service';
import {MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-modal-add-form',
  templateUrl: './modal-add-form.component.html',
  styleUrls: ['./modal-add-form.component.css']
})
export class AddFormDialogComponent implements OnInit {
  fullName: string;
  lrn: string;
  constructor( private dialogRef: MatDialogRef<AddFormDialogComponent>) {
    this.fullName = '';
    this.lrn = '';
  }

  ngOnInit(): void {
  }
  close(): void {
    this.dialogRef.close();
    console.log(this.fullName, this.lrn);
  }
  addStudent(): void {
    console.log('submitted');
  }

}


