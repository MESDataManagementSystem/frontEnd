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
  options2: string[] = ['Yes', 'No'];
  filteredOptions: Observable<string[]>;
  filteredOptions1: Observable<string[]>;
  filteredOptions2: Observable<string[]>;

  teachersForm = {
    lastName: "Rivas",
    firstName: "Irish",
    middleName: "Rufo",
    nameExt: "None",
    employeeNumber: "67563456",
    itemNumber: "asdf34352",
    dateOfBirth: "",
    placeOfBirth: "cdga",
    age: "",
    gender: "F",
    maritalStatus: "Single",
    homeAddress: "fd",
    schoolAssignment: "dfd",
    district: "dfd",
    currentPosition: "dfd",
    employeeStatus: "dfd",
    designation: "dfd",
    firstDayOfService: "",
    dateOfLastPromotion: "",
    salaryGrade: "4",
    stepIncrement: "5",
    eligibility: "fd",
    contactNumber: "09968817703",
    depEdEmailAddress: "irish@gmail.com",
    tin: "dfv343",
    philHealthNumber: "dsfasd34",
    gsisBPNumber: "afadsfaf",
    pagIbigNumber: "dsfa",
    availableServiceCredits: "34",
    activeStatus: ""
  }

  constructor(
    public dialog: MatDialog,
    private teacherService: TeacherServiceService,
    private swal: SwalService
  ) { 
  }

  ngOnInit(): void {
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
    );
    this.filteredOptions2 = this.optionsControl.valueChanges.pipe(
      startWith(''),
      map(
        value => this.activeStatuses(value)
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

   // For Active Status
   private activeStatuses(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options2.filter(option => option.toLowerCase().indexOf(filterValue) === 0)
  }

  // All Fields Are Required 
  getErrorMessage() {
    if (this.error.hasError('required')) {
      return 'You must enter a value';
    }
  }

  // Add Teacher
  addTeacher() {
    this.teachersForm.activeStatus =  this.teachersForm.activeStatus.toLowerCase()
    alert(this.teachersForm.activeStatus)
    if ( this.teachersForm.activeStatus == 'yes' || this.teachersForm.activeStatus == 'no') {
      this.teacherService.addTeacher(this.teachersForm).subscribe((data) => {
        if (data) {
          this.swal.succesAlert()
          this.dialog.closeAll();
          window.location.reload();
        }
      })
    } else {
      alert("error")
    }
   
  }

}
