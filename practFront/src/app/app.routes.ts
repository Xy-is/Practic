import { Routes } from '@angular/router';
import {DepartmentsComponent} from "./departments/departments.component";
import {ProjectsComponent} from "./projects/projects.component";
import {EmployeesInDepartmentComponent} from "./employees-in-department/employees-in-department.component";
import {ProjectInDepartmentComponent} from "./project-in-department/project-in-department.component";
import {EmployeesComponent} from "./employees/employees.component";
import {TasksComponent} from "./tasks/tasks.component";
import {TasksInProjectComponent} from "./tasks-in-project/tasks-in-project.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AdminPanelComponent} from "./admin-panel/admin-panel.component";

export const routes: Routes = [
  { path: 'departments', component: DepartmentsComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'departments/employee/:id', component: EmployeesInDepartmentComponent },
  { path: 'departments/project/:id', component: ProjectInDepartmentComponent },
  { path: 'projects/:id', component: TasksInProjectComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminPanelComponent },
  //{ path: '/projects', component: TasksInProjectComponent},
];
