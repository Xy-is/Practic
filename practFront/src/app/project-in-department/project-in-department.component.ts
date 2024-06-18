import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

import {ConfirmDialogComponent} from "../confirm-dialog-component/confirm-dialog-component.component";
import {ProjectService} from "../projects/projects.service";
import {ProjectInDepartmentService} from "./project-in-department.service";

@Component({
  selector: 'app-project-in-department',
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
  templateUrl: './project-in-department.component.html',
  styleUrls: ['./project-in-department.component.css']
})
export class ProjectInDepartmentComponent implements OnInit {
  dataSource: any;
  projects: any[] = [];
  department: any;
  noData: string | undefined;
  displayedColumns: string[] = ['id', 'name', 'description', 'departmentName', 'status', 'delete'];

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectService,
    private projectInDepartmentService: ProjectInDepartmentService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.updateDepartment();
    // Fetch projects using the departmentId
  }

  private updateDepartment() {
    const departmentId = this.route.snapshot.paramMap.get('id');
    if (departmentId) {
      this.projectInDepartmentService.getDepartmentById(+departmentId).subscribe(data => {
        this.department = data;
        this.dataSource = this.department.projectDtos;
        this.noData = "No data";
        console.log(this.dataSource);
      });
    }
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
    this.projectsService.deleteProject(id).subscribe((response) => {
        this.updateDepartment();
      },
      (error) => {
        console.error('Error deleting project:', error);
      }
    );
  }

  newProject = {id: '', name: '', description: '', departmentName: '', status: ''};

  addProject() {
    const newProjectData = {
      name: this.newProject.name,
      description: this.newProject.description,
      department: {
        id: this.department.id // Use the current department's ID
      },
      status: this.newProject.status
    };

    // @ts-ignore
    this.projectsService.createProject(newProjectData).subscribe(
      (response) => {
        console.log('Project created:', response);
        this.updateDepartment(); // Refresh the list of projects
      },
      (error) => {
        console.error('Error creating project:', error);
      }
    );
  }

  updateProject(projectId: number) {
    const updatedProjectData = {
      id: projectId,
      name: this.newProject.name,
      description: this.newProject.description,
      department: {
        id: this.department.id // Use the current department's ID
      },
      status: this.newProject.status
    };

    // @ts-ignore
    this.projectsService.createProject(updatedProjectData).subscribe(
      (response) => {
        console.log('Project updated:', response);
        this.updateDepartment(); // Refresh the list of projects
      },
      (error) => {
        console.error('Error updating project:', error);
      }
    );
  }
}

