import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { EmployeeComponent } from './employee/employee.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './employee/create/create.component';
import { RecentComponent } from './employee/recent/recent.component';
import { SearchRecordsComponent } from './employee/search-records/search-records.component';
import { SearchTestsComponent } from './employee/search-tests/search-tests.component';
import { PatientDetailsComponent } from './employee/patient-details/patient-details.component';
import { EmployeesComponent } from './admin/employees/employees.component';
import { CreateEmployeeComponent } from './admin/create-employee/create-employee.component';

import { StatisticsComponent } from './admin/statistics/statistics.component';
import { EmployeeDetailsComponent } from './admin/employee-details/employee-details.component';
export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'home/login', component: LoginComponent },
  {
    path: 'home/admin',
    component: AdminComponent,
    children: [
      { path: 'employees', component: EmployeesComponent },
      { path: 'create', component: CreateEmployeeComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: 'details', component: EmployeeDetailsComponent },
      { path: '', redirectTo: 'employees', pathMatch: 'full' },
    ],
  },
  {
    path: 'home/employee',
    component: EmployeeComponent,
    children: [
      { path: 'create', component: CreateComponent },
      { path: 'recent', component: RecentComponent },
      { path: 'searchRecords', component: SearchRecordsComponent },
      { path: 'searchTests', component: SearchTestsComponent },
      { path: 'patientDetails', component: PatientDetailsComponent },
      { path: '', redirectTo: 'recent', pathMatch: 'full' },
    ],
  },

  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/home' }, // Wildcard route for a 404 page
];
