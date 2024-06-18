import {Injectable} from '@angular/core';
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TasksInProjectService {

  constructor(private http: HttpClient) {
  }

  getProjectById(id: number) {
    return this.http.get(`http://localhost:8080/api/project/getbyid/${id}`)
      .pipe(
        catchError(error => {
          console.error('Произошла ошибка:', error);
          return throwError(error);
        })
      );
  }
}
