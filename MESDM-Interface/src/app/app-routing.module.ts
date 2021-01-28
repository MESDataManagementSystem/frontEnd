import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import { AllStudentsComponent } from './all-students/all-students.component';
import { AllTeachersComponent } from './all-teachers/all-teachers.component';
import { ClassesComponent } from './classes/classes.component';



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'allStudents', component: AllStudentsComponent},
  { path: 'allTeachers', component: AllTeachersComponent},
  { path: 'classes', component: ClassesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
