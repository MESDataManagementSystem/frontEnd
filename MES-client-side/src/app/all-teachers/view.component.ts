import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { TeacherServiceService } from '../services/teacher-service.service';
import { SwalService } from '../services/swal.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Teacher } from './teacher.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {


  hideOverlay = true;
  public buttonName: any = 'Click Here To Edit';
  public teacher: any;
  public age: number;
  teachersForm: Teacher;
  maxDate = new Date();
  error = new FormControl('', [Validators.required]);
  optionsControl = new FormControl();
  options: string[] = ['M', 'F'];
  options1: string[] = ['Single', 'Married', 'Divorced', 'Separated', 'Widowed'];
  filteredOptions: Observable<string[]>;
  filteredOptions1: Observable<string[]>;

  constructor(
    public dialogRef: MatDialogRef<ViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Teacher,
    public dialog: MatDialog,
    private teacherService: TeacherServiceService,
    private swal: SwalService
  ) {
    this.teachersForm = {
      _id: "",
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
    };
  }

  ngOnInit() {
    this.filteredOptions = this.optionsControl.valueChanges.pipe(
      startWith(''),
      map(value => this.gender(value))
    );
    this.filteredOptions1 = this.optionsControl.valueChanges.pipe(
      startWith(''),
      map(
        value => this.status(value)
      )
    )
  }

  // All Fields Are Required 
  getErrorMessage() {
    if (this.error.hasError('required')) {
      return 'You must enter a value';
    }
  }

  // Automatic Calculate The Age After Inputing The Birth Date
  public CalculateAge(): void {
    if (this.data.dateOfBirth) {
      var timeDiff = Math.abs(Date.now() - new Date(this.data.dateOfBirth).getTime());
      this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
      this.data.age = String(this.age);
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

  // For Confirmation Before Updating
  warningAlert() {
    Swal.fire({
      icon: 'warning',
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      confirmButtonText: `Save`,
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
        this.updateTeacherInfo();
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  // For Clicking The Update Button
  updateClick() {
    this.warningAlert();
  }

  // Update Teacher's Information
  updateTeacherInfo() {
    if (
      this.data.lastName !== null && this.data.lastName !== '' &&
      this.data.firstName !== null && this.data.firstName !== '' &&
      // this.data.middleName !== null && this.data.middleName !== '' &&
      this.data.nameExt !== null && this.data.nameExt !== '' &&
      this.data.employeeNumber !== null && this.data.employeeNumber !== '' &&
      this.data.itemNumber !== null && this.data.itemNumber !== '' &&
      this.data.dateOfBirth !== null && this.data.dateOfBirth !== '' &&
      this.data.placeOfBirth !== null && this.data.placeOfBirth !== '' &&
      this.data.age !== null && this.data.age !== '' &&
      this.data.gender !== null && this.data.gender !== '' &&
      this.data.maritalStatus !== null && this.data.maritalStatus !== '' &&
      this.data.homeAddress !== null && this.data.homeAddress !== '' &&
      this.data.schoolAssignment !== null && this.data.schoolAssignment !== '' &&
      this.data.district !== null && this.data.district !== '' &&
      this.data.currentPosition !== null && this.data.currentPosition !== '' &&
      this.data.employeeStatus !== null && this.data.employeeStatus !== '' &&
      this.data.designation !== null && this.data.designation !== '' &&
      this.data.firstDayOfService !== null && this.data.firstDayOfService !== '' &&
      // this.data.dateOfLastPromotion !== null && this.data.dateOfLastPromotion !== '' &&
      this.data.salaryGrade !== null && this.data.salaryGrade !== '' &&
      this.data.stepIncrement !== null && this.data.stepIncrement !== '' &&
      this.data.eligibility !== null && this.data.eligibility !== '' &&
      this.data.contactNumber !== null && this.data.contactNumber !== '' &&
      this.data.depEdEmailAddress !== null && this.data.depEdEmailAddress !== '' &&
      this.data.tin !== null && this.data.tin !== '' &&
      this.data.philHealthNumber !== null && this.data.philHealthNumber !== '' &&
      this.data.gsisBPNumber !== null && this.data.gsisBPNumber !== '' &&
      this.data.pagIbigNumber !== null && this.data.pagIbigNumber !== '' &&
      this.data.availableServiceCredits !== null && this.data.availableServiceCredits !== ''
    ) {
      this.teacherService.updateTeacher(this.data).subscribe(data => {
        if (data) {
          this.dialog.closeAll();
        }
      })
    } else {
      this.swal.errorAlertForTeacherFieldsRequired();
    }
  }

}
