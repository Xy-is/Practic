import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  MatTableModule
} from "@angular/material/table";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput, MatInputModule} from "@angular/material/input";
import {NgForOf} from "@angular/common";
import {TasksService} from "./tasks.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog-component/confirm-dialog-component.component";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-tasks',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatButton,
    MatTableModule,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    NgForOf,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  tasks: any[] = [];
  newTask = {id: '', name: '', description: '', status: '', dueDate: '', projectName: ''};
  noData: string | undefined;
  displayedColumns: string[] = ['id', 'name', 'description', 'status', 'dueDate', 'projectName', 'delete'];
  dataSource = this.tasks;
  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 20, 0, 1);
  readonly maxDate = new Date(this._currentYear + 1, 11, 31);


  constructor(private tasksService: TasksService, public dialog: MatDialog) {
    this.tasks = [];
  }

  ngOnInit() {
    this.updateTasks();
  }

  addTask() {
    let currentTask = {...this.newTask};
    this.tasks.unshift(currentTask);
    this.newTask = {id: '', name: '', description: '', status: '', dueDate: '', projectName: ''};
    // @ts-ignore
    this.tasksService.createTask(currentTask).subscribe(
      (response) => {
        this.updateTasks();
      },
      (error) => {
        console.error('Ошибка при создании задачи:', error);
      }
    );
  }

  openConfirmDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {title: 'Confirm Delete', message: 'Are you sure you want to delete this task?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTask(id);
      }
    });
  }

  private deleteTask(id: number) {
    this.tasksService.deleteTask(id).subscribe(
      (response) => {
        this.updateTasks();
      },
      (error) => {
        console.error('Ошибка при удалении задачи:', error);
      }
    );
  }

  private updateTasks() {
    this.tasksService.getTasks().subscribe(data => {
      // @ts-ignore
      this.tasks = data;
      this.dataSource = this.tasks;
      this.noData = "No data";
      console.log(this.dataSource)
    });
  }
}
