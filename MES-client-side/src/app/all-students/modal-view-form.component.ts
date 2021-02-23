import { Component, OnInit } from '@angular/core';
import { StudentServiceService } from '../services/student-service.service';

@Component({
  selector: 'app-modal-view-form',
  templateUrl: './modal-view-form.component.html',
  styleUrls: ['./modal-view-form.component.css']
})
export class ModalViewFormComponent implements OnInit {
  pdfSource: string;
  constructor(private service: StudentServiceService) {
    this.pdfSource = 'http://localhost:5000/uploads/1614084713839.pdf';
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
