import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {EmployeesService} from "./employees.service";
import {FormsModule} from "@angular/forms";
import {
  MatTableModule,
} from "@angular/material/table";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {NgForOf} from "@angular/common";
import {Router} from '@angular/router';
import {ConfirmDialogComponent} from "../confirm-dialog-component/confirm-dialog-component.component";

@Component({
  selector: 'app-departents',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButton,
    FormsModule,
    MatTableModule,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    NgForOf,
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {
  employee: any[] = [];
  newEmployee = {id: '', firstName: '', lastName: '', position: '', departmentName: ''};

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'position', 'departmentName', 'delete'];
  dataSource = this.employee;
  noData: string | undefined;

  constructor(private employeeService: EmployeesService, public dialog: MatDialog, private router: Router,) {
    this.employee = [];
  }

  ngOnInit() {
    this.updateEmployee();
    console.log(1)
  }

  private updateEmployee() {
    this.employeeService.getEmployees().subscribe(data => {
      // @ts-ignore
      this.employee = data;
      this.dataSource = this.employee;
      console.log(this.dataSource)
    });
  }

  addEmployee() {
    let currentEmployee= {...this.newEmployee};
    this.employee.unshift(currentEmployee);
    this.newEmployee = {id: '', firstName: '', lastName: '', position: '', departmentName: ''};
    this.employeeService.createEmployees(currentEmployee).subscribe(
      (response) => {
        this.updateEmployee();
      },
      (error) => {

        console.error('Ошибка при создании сотрудника:', error);
      }
    );
  }

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
        this.updateEmployee();
      },
      (error) => {

        console.error('Ошибка при удалении сотрудника:', error);
      }
    );
  }

}
