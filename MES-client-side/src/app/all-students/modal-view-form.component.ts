import { Component, OnInit } from '@angular/core';
import { StudentServiceService } from '../services/student-service.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PDFSource } from 'ng2-pdf-viewer';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-modal-view-form',
  templateUrl: './modal-view-form.component.html',
  styleUrls: ['./modal-view-form.component.css']
})


export class ModalViewFormComponent implements OnInit {
  pdfSource: string;
  constructor(private service: StudentServiceService, @Inject(MAT_DIALOG_DATA) public data: Url) {
    this.pdfSource = this.data + '';
  }

  ngOnInit(): void {
    this.viewFile();
  }

  viewFile(): void {
    const data = {url: this.pdfSource};
    // tslint:disable-next-line:no-shadowed-variable
    this.service.viewFile(data).subscribe(data => {
      console.log('dataaaa::: ', data.data.url);
      this.pdfSource = data.data.url;
    });
  }

}

export interface Url{
  url: string;
}
