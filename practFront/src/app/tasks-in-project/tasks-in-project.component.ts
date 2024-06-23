import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatTableModule} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {TasksService} from "../tasks/tasks.service";
import {TasksInProjectService} from "./tasks-in-project.service";
import {ConfirmDialogComponent} from "../confirm-dialog-component/confirm-dialog-component.component";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from "@angular/material/core";


@Component({
  selector: 'app-tasks-in-project',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatTableModule,
    MatIcon,
    MatIconButton,
    NgForOf,
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerModule,
    MatHint,
    MatSuffix
  ],
  templateUrl: './tasks-in-project.component.html',
  styleUrls: ['./tasks-in-project.component.css']
})
export class TasksInProjectComponent implements OnInit {
  dataSource: any;
  tasks: any[] = [];
  project: any;
  noData: string | undefined;
  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 20, 0, 1);
  readonly maxDate = new Date(this._currentYear + 1, 11, 31);

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private tasksInProjectService: TasksInProjectService,
    private tasksService: TasksService
  ) {
  }

  ngOnInit() {
    this.updateProject();
  }

  displayedColumns: string[] = ['id', 'name', 'description', 'status', 'dueDate', 'projectName', 'delete'];

  newTask = {
    id: '',
    name: '',
    description: '',
    status: '',
    dueDate: '',
    projectName: ''
  };

  private updateProject() {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.tasksInProjectService.getProjectById(+projectId).subscribe(data => {
        this.project = data;
        this.dataSource = this.project;
        this.tasks = this.project.taskDtos;
        this.noData = "No data";
        console.log(this.tasks);
      });
    }
  }


  addTask() {
    const newTaskData = {
      name: this.newTask.name,
      description: this.newTask.description,
      status: this.newTask.status,
      dueDate: this.newTask.dueDate,
      project: {
        id: this.project.id // Use the current project's ID
      }
    };
    // @ts-ignore
    this.tasksService.createTask(newTaskData).subscribe((response) => {
        console.log('Task created:', response);
        this.updateProject();
      },
      (error) => {
        // Handle error
        console.error('Error creating task:', error);
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
        this.deleteTask(id);
      }
    });
  }

  deleteTask(id: number) {
    this.tasksService.deleteTask(id).subscribe((response) => {
        this.updateProject();
      },
      (error) => {

        console.error('Ошибка при удалении сотрудника:', error);
      }
    );
  }
}
