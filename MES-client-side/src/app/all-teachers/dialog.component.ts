import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { TeacherServiceService } from '../services/teacher-service.service';
import { SwalService } from '../services/swal.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  public age: number;
  maxDate = new Date();
  error = new FormControl('', [Validators.required]);
  optionsControl = new FormControl();
  options: string[] = ['M', 'F'];
  options1: string[] = ['Single', 'Married', 'Divorced', 'Separated', 'Widowed'];
  filteredOptions: Observable<string[]>;
  filteredOptions1: Observable<string[]>;

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

  constructor(
    public dialog: MatDialog,
    private teacherService: TeacherServiceService,
    private swal: SwalService
  ) { }

  ngOnInit() {
    this.filteredOptions = this.optionsControl.valueChanges.pipe(
      startWith(''),
      map(
        value => this.gender(value)
        )
    );
    this.filteredOptions1 = this.optionsControl.valueChanges.pipe(
      startWith(''),
      map(
        value => this.status(value)
      )
    )
  }

  // Automatic Calculate The Age After Inputing The Birth Date
  public CalculateAge(): void {
    if (this.teachersForm.dateOfBirth) {
      var timeDiff = Math.abs(Date.now() - new Date(this.teachersForm.dateOfBirth).getTime());
      this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
      this.teachersForm.age = String(this.age);
    }
  }

  // For Gender Options
  private gender(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0)
  }

  // For Marital Status
  private status(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options1.filter(option => option.toLowerCase().indexOf(filterValue) === 0)
  }

  // All Fields Are Required 
  getErrorMessage() {
    if (this.error.hasError('required')) {
      return 'You must enter a value';
    }
  }

  // Add Teacher
  addTeacher() {
    console.log(this.teachersForm)
    this.teacherService.addTeacher(this.teachersForm).subscribe((data) => {
      if (data) {
        this.swal.succesAlert()
        this.dialog.closeAll();
        window.location.reload();
      }
    })
  }

}
