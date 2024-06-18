import {Injectable} from '@angular/core';
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

export interface Project {
  name: string;
  description: string;
  departmentName: string; // Using name instead of ID for department
  status: string;
  taskNames: string[]; // Using names instead of IDs for tasks
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) {
  }

  getProjects() {
    return this.http.get('http://localhost:8080/api/project/getall')
      .pipe(
        catchError(error => {
          console.error('Произошла ошибка:', error);
          return throwError(error);
        })
      );
  }

  deleteProject(id: number) {
    return this.http.delete(`http://localhost:8080/api/project/delete/${id}`);
  }

  createProject(project: Project) {
    return this.http.post<Project>('http://localhost:8080/api/project', project, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
