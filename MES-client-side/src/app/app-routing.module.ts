import { AuthGuardLogInActivateGuard } from './auth-guard-log-in-activate.guard';
import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClassesComponent } from './classes/classes.component';
import { AllTeachersComponent } from './all-teachers/all-teachers.component';
import { AllStudentsComponent } from './all-students/all-students.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ViewStudentsComponent } from './classes/view-students.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardLogInActivateGuard] },
  {
    path: 'MES',
    component: SideNavComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'settings', component: SettingsComponent },
      { path: 'students', component: AllStudentsComponent },
      { path: 'teachers', component: AllTeachersComponent },
      { path: 'classes', component: ClassesComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'classes/:grade/:section', component: ViewStudentsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
