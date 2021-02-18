import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { TeacherServiceService } from '../services/teacher-service.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {



  maxDate = new Date();
  error = new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.error.hasError('required')) {
      return 'You must enter a value';
    }
  }

  teachersForm = {
    lastName: "",
    firstName: "",
    middleName: "",
    nameExt: "",
    employeeNumber: "",
    itemNumber: "",
    dateOfBirth: "",
    placeOfBirth: "",
    age: "",
    gender: "",
    maritalStatus: "",
    homeAddress: "",
    schoolAssignment: "",
    district: "",
    currentPosition: "",
    employeeStatus: "",
    designation: "",
    firstDayOfService: "",
    dateOfLastPromotion: "",
    salaryGrade: "",
    stepIncrement: "",
    eligibility: "",
    contactNumber: "",
    depEdEmailAddress: "",
    tin: "",
    philHealthNumber: "",
    gsisBPNumber: "",
    pagIbigNumber: "",
    availableServiceCredits: "",
  }

  // public dateOfBirth: Date;
  public age: number;

  myControl = new FormControl();
  options: string[] = ['M', 'F'];
  filteredOptions: Observable<string[]>;

  constructor(public dialog: MatDialog, private teacherService: TeacherServiceService) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  public CalculateAge(): void {
    if (this.teachersForm.dateOfBirth) {
      var timeDiff = Math.abs(Date.now() - new Date(this.teachersForm.dateOfBirth).getTime());
      this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
      console.log(this.age)
        }
      }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  addTeacher() {
    console.log(this.teachersForm)
    this.teacherService.addTeacher(this.teachersForm).subscribe((data) => {
      if (data) {
        this.CalculateAge();
        this.succesAlert();
        this.dialog.closeAll();
        window.location.reload();
      }
    })
  }

  succesAlert() {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Your Work Has Been Saved'
    })
  }
}
