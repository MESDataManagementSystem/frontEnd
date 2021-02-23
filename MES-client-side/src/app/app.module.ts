import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {  PdfViewerModule  } from 'ng2-pdf-viewer';

// import { HttpClientModule, HttpClient } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';
// import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AllStudentsComponent } from './all-students/all-students.component';
import { AllTeachersComponent } from './all-teachers/all-teachers.component';
import { ClassesComponent } from './classes/classes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AddFormDialogComponent } from './all-students/modal-add-form.component';

import { StudentServiceService } from './services/student-service.service';
import { ModalViewFormComponent } from './all-students/modal-view-form.component';

// import { ModalAddFormComponent } from './Modals/modal-add-form/modal-add-form.component';


@NgModule({
  declarations: [
    AppComponent,
    AllStudentsComponent,
    AllTeachersComponent,
    ClassesComponent,
    DashboardComponent,
    LoginComponent,
    SideNavComponent,
    // ModalAddFormComponent,
    AddFormDialogComponent,
    ModalViewFormComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    MatMenuModule,
    MatGridListModule,
    HttpClientModule,
    PdfViewerModule
  ],
  providers: [StudentServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
