import {Injectable} from '@angular/core';
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

export interface Project {
  name: string;
  description: string;
  departmentName: string;
  status: string;
  taskNames: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient, private cookieService:CookieService) {
  }

  getProjects() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.cookieService.get('jwt')}`
    });
    return this.http.get('http://localhost:8080/api/project/getall', {headers:headers})
      .pipe(
        catchError(error => {
          console.error('Произошла ошибка:', error);
          return throwError(error);
        })
      );
  }

  deleteProject(id: number) {
    const token = this.cookieService.get('jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`http://localhost:8080/api/project/delete/${id}`);
  }

  createProject(project: Project) {
    const token = this.cookieService.get('jwt');
    return this.http.post<Project>('http://localhost:8080/api/project', project, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    });
  }
}
