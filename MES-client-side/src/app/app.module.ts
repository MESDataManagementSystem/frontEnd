import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ValidateEqualModule } from 'ng-validate-equal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { ChartsModule } from 'ng2-charts';


import { AllStudentsComponent } from './all-students/all-students.component';
import { AllTeachersComponent } from './all-teachers/all-teachers.component';
import { ClassesComponent } from './classes/classes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SideNavComponent } from './side-nav/side-nav.component';

import { StudentServiceService } from './services/student-service.service';
import { ModalViewFormComponent } from './all-students/modal-view-form.component';
import { AddFormDialogComponent } from './all-students/modal-add-form.component';
import { ModalEditFormComponent } from './all-students/modal-edit-form.component';


import { DialogComponent } from './all-teachers/dialog.component';
import { ViewComponent } from './all-teachers/view.component';
import { TeacherServiceService } from './services/teacher-service.service';

import { AddSectionComponent } from './classes/add-section.component';
import { ViewStudentsComponent } from './classes/view-students.component';
import { AddStudentInfoComponent } from './classes/add-student-info.component';
import { SettingsComponent } from './settings/settings.component';
import { TeacherDashboardComponent } from './teacherSideUser/teacher-dashboard/teacher-dashboard.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MultidatepickerComponent } from './multidatepicker/multidatepicker.component';
import { YearPickerComponent } from './multidatepicker/year-picker/year-picker.component';
import { DashboardDialogComponent } from './dashboard/dashboard-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AllStudentsComponent,
    AllTeachersComponent,
    ClassesComponent,
    DashboardComponent,
    LoginComponent,
    SideNavComponent,
    ModalViewFormComponent,
    AddFormDialogComponent,
    DialogComponent,
    ViewComponent,
    AddSectionComponent,
    ViewStudentsComponent,
    ModalEditFormComponent,
    AddStudentInfoComponent,
    SettingsComponent,
    TeacherDashboardComponent,
    MultidatepickerComponent,
    YearPickerComponent,
    DashboardDialogComponent
  ],
  imports: [
    ValidateEqualModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    MatButtonToggleModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatTabsModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatGridListModule,
    HttpClientModule,
    PdfViewerModule,
    MaterialFileInputModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MDBBootstrapModule,
    ChartsModule
  ],
  providers: [
    HttpClient,
    StudentServiceService,
    TeacherServiceService,
    {
      provide: MatDialogRef,
      useValue: {}
    }, {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
