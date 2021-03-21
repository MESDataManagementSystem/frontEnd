import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  // Alert For Success
  succesAlert() {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Your Work Has Been Saved',
      showConfirmButton: false,
      timer: 1500
    })
    // location.reload()
  }

  // Alert For Error In The Fields Required
  errorAlertForAllFieldsAreRequired() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'All Fields Are Required!'
    })
  }

  // Allert For Error In PDF File
  errorAlertForPDFFile() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'All Fields Are Required! And Accept PDF File Only'
    })
  }

  // Alert For Teacher's Fields Required
  errorAlertForTeacherFieldsRequired() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'All Fields Are Required! Except For Middle Name and Date Of Last Promotion'
    })
  }

  // Username And Password Did Not Match
  credentialsDidNotMatch() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Username And Password Did Not Match'
    })
  }

  // Alert For Something Went Wrong
  errorAlertForSomethingWentWrong() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something Went Wrong',
      timer: 1000
    })
  }
}

