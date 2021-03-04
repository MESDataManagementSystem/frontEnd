import { Component, OnInit } from '@angular/core';
import { StudentServiceService } from '../services/student-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import printJS from '../../../node_modules/print-js/src/index';
declare var require: any;
const FileSaver = require('file-saver');

@Component({
  selector: 'app-modal-view-form',
  templateUrl: './modal-view-form.component.html',
  styleUrls: ['./modal-view-form.component.css']
})


export class ModalViewFormComponent implements OnInit {
  
  pdfSource: string;
  require: any;
  pdfName: any;
  constructor(private service: StudentServiceService, @Inject(MAT_DIALOG_DATA) public data: Url) {
    this.pdfSource = this.data[0] + '';
    this.pdfName = this.data[1];
  }

  ngOnInit(): void {
    this.viewFile();
  }

  printPdf(): void {
    printJS({ printable: this.pdfSource, showModal: true });
  }

  downloadPdf(): void {
    const pdfUrl = this.pdfSource;
    const pdfName = this.pdfName;
    FileSaver.saveAs(pdfUrl, pdfName);
  }

  viewFile(): void {
    const data = { url: this.pdfSource };
    this.service.viewFile(data).subscribe(data => {
      this.pdfSource = data.data.url;
    });
  }

}

export interface Url {
  url: string;
}
