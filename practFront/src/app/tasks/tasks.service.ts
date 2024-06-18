import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) {
  }

  getTasks() {
    return this.http.get('http://localhost:8080/api/tasks/getall')
      .pipe(
        catchError(error => {
          console.error('Произошла ошибка:', error);
          return throwError(error);
        })
      );
  }

  deleteTask(id: number) {
    return this.http.delete(`http://localhost:8080/api/tasks/delete/${id}`)
  }

  createTask(task: Task): Observable<Task> {
    console.log(task)
    return this.http.post<Task>('http://localhost:8080/api/tasks', task, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}

export class Task {
  id: number;
  description: string;
  status: string;
  dueDate: Date;
  projectName: string;

  constructor(id: number, description: string, status: string, dueDate: Date, projectName: string) {
    this.id = id;
    this.description = description;
    this.status = status;
    this.dueDate = dueDate;
    this.projectName = projectName;
  }
}
