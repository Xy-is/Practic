import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EmployeesInDepartmentService} from "./employees-in-department.service";
import {
  MatTableModule
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {ConfirmDialogComponent} from "../confirm-dialog-component/confirm-dialog-component.component";
import {MatDialog} from "@angular/material/dialog";
import {EmployeesComponent} from "../employees/employees.component";
import {EmployeesService} from "../employees/employees.service";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-employees-in-department',
  standalone: true,
  imports: [
    MatTableModule,
    MatIcon,
    MatIconButton,
    NgForOf,
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './employees-in-department.component.html',
  styleUrl: './employees-in-department.component.css'
})
export class EmployeesInDepartmentComponent implements OnInit {
  dataSource: any;
  projects: any[] = [];
  employees: any[] = [];
  department: any;
  noData: string | undefined;

  constructor(private route: ActivatedRoute, private employeeService: EmployeesService, private departmentDetailService: EmployeesInDepartmentService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.updateDepartment()
    // Fetch employees using the departmentId
  }

  displayedColumnsProjects: string[] = ['id', 'firstName', 'lastName', 'position', 'departmentName', 'delete'];
  // @ts-ignore
  employees: any = this.department;
  newEmployee = {id: '', firstName: '', lastName: '', position: '', departmentName: ''};


  private updateDepartment() {
    const departmentId = this.route.snapshot.paramMap.get('id');
    if (departmentId) {
      this.departmentDetailService.getDepartmentById(+departmentId).subscribe(data => {
        // @ts-ignore
        this.department = data;
        this.dataSource = this.department;
        this.employees = this.department.employeeDtos;
        this.noData = "No data";
        console.log(this.employees)
      });
    }
  }

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'position', 'departmentName', 'delete'];

  openConfirmDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {title: 'Confirm Delete', message: 'Are you sure you want to delete this employee?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteEmployee(id);
      }
    });
  }

  private deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe((response) => {
        this.updateDepartment();
      },
      (error) => {

        console.error('Ошибка при удалении сотрудника:', error);
      }
    );
  }

  addDepartment() {
    // Assuming 'department' contains the current department details including its ID
    const newEmployeeData = {
      firstName: this.newEmployee.firstName,
      lastName: this.newEmployee.lastName,
      position: this.newEmployee.position,
      department: {
        id: this.department.id // Use the current department's ID
      }
    };

    // Call a service method to send the POST request
    this.employeeService.createEmployees(newEmployeeData).subscribe(
      (response) => {
        // Handle successful response
        console.log('Employee created:', response);
        this.updateDepartment(); // Refresh the list of employees
      },
      (error) => {
        // Handle error
        console.error('Error creating employee:', error);
      }
    );
  }

}
