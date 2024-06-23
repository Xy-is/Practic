import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {DepartmentService} from "./department.service";
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
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css'
})
export class DepartmentsComponent implements OnInit {
  department: any[] = [];
  newDepartment = {id: '', name: '', managerId: '', employeeDtos: '', projectDtos: ''};

  displayedColumns: string[] = ['id', 'name', 'managerId', 'employeeDtos', 'projectDtos', 'delete'];
  dataSource = this.department;
  noData: string | undefined;

  constructor(private departmentService: DepartmentService, public dialog: MatDialog, private router: Router,) {
    this.department = [];
  }

  ngOnInit() {
    this.updateDepartment();

  }

  private updateDepartment() {
    this.departmentService.getDepartment().subscribe(data => {
      // @ts-ignore
      this.department = data;
      this.dataSource = this.department;
      console.log(this.dataSource)
    });
  }

  addDepartment() {
    let currentDepartment = {...this.newDepartment};
    this.department.unshift(currentDepartment);
    this.newDepartment = {id: '', name: '', managerId: '', employeeDtos: '', projectDtos: ''};
    this.departmentService.createDepartment(currentDepartment).subscribe(
      (response) => {
        this.updateDepartment();
      },
      (error) => {

        console.error('Ошибка при создании сотрудника:', error);
      }
    );
  }

  openConfirmDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {title: 'Confirm Delete', message: 'Are you sure you want to delete this department?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteDepartment(id);
      }
    });
  }

  private deleteDepartment(id: number) {
    this.departmentService.deleteDepartment(id).subscribe((response) => {
        this.updateDepartment();
      },
      (error) => {

        console.error('Ошибка при удалении сотрудника:', error);
      }
    );
  }

  openDepartment(id: number): void {
    this.router.navigate(['/departments/employee', id]);
  }

  openProject(id: number) {
    this.router.navigate(['/departments/project', id]);
  }
}
