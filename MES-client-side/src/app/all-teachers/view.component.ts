import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { TeacherServiceService } from '../services/teacher-service.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Teacher } from './teacher.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  public teacher: any;
  public age: number;
  maxDate = new Date();
  error = new FormControl('', [Validators.required]);
  optionsControl = new FormControl();
  options: string[] = ['M', 'F'];
  filteredOptions: Observable<string[]>;
  teachersForm: Teacher;
  disabled: boolean;
  closeUpdateBtn: boolean;
  constructor(
    public dialogRef: MatDialogRef<ViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Teacher,
    public dialog: MatDialog,
    private teacherService: TeacherServiceService
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
    }
  }

  ngOnInit() {
    this.disabled = false
    this.filteredOptions = this.optionsControl.valueChanges.pipe(
      startWith(''),
      map(value => this.gender(value))
    );

  }

  getErrorMessage() {
    if (this.error.hasError('required')) {
      return 'You must enter a value';
    }
  }

  public CalculateAge(): void {
    if (this.data.dateOfBirth) {
      var timeDiff = Math.abs(Date.now() - new Date(this.data.dateOfBirth).getTime());
      this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
      this.data.age = String(this.age);
      console.log(this.data.age)
    }
  }

  private gender(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0)
  }

  succesAlert() {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Your Work Has Been Saved'
    })
  }

  warningAlert() {
    Swal.fire({
      icon: 'warning',
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Save`,
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  updateClick() {
    this.updateTeacherInfo();
  }

  updateTeacherInfo() {
    this.teacherService.updateTeacher(this.data).subscribe(data => {
      if (data) {
        this.succesAlert();
        this.dialog.closeAll();
        window.location.reload();
      }
    })
  }


}
