import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";

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
import {ProjectService} from "./projects.service";

@Component({
  selector: 'app-projects',
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
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];
  newProject = {
    id: '',
    name: '',
    description: '',
    departmentName: '',
    status: '',
    taskDtos: []
  };

  displayedColumns: string[] = ['id', 'name', 'description', 'departmentName', 'status', 'taskDtos', 'delete'];
  dataSource = this.projects;
  noData: string | undefined;

  constructor(private projectService: ProjectService, public dialog: MatDialog, private router: Router) {
    this.projects = [];
  }

  ngOnInit() {
    this.updateProjects();
  }

  private updateProjects() {
    this.projectService.getProjects().subscribe(data => {
      // @ts-ignore
      this.projects = data;
      this.dataSource = this.projects;
      this.noData = "No data";
      console.log(this.dataSource);
    });
  }

  addProject() {
    let currentProject = {...this.newProject};
    this.projects.unshift(currentProject);
    this.newProject = {
      id: '',
      name: '',
      description: '',
      departmentName: '',
      status: '',
      taskDtos: []
    };

    // @ts-ignore
    this.projectService.createProject(currentProject).subscribe(
      (response) => {
        this.updateProjects();
      },
      (error) => {
        console.error('Ошибка при создании проекта:', error);
      }
    );
  }

  openConfirmDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {title: 'Confirm Delete', message: 'Are you sure you want to delete this project?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProject(id);
      }
    });
  }

  private deleteProject(id: number) {
    this.projectService.deleteProject(id).subscribe(
      (response) => {
        this.updateProjects();
      },
      (error) => {
        console.error('Ошибка при удалении проекта:', error);
      }
    );
  }

  openProject(id: number): void {
    this.router.navigate(['/projects', id]);
  }

}
