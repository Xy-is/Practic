import {Injectable} from '@angular/core';
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProjectInDepartmentService {

  constructor(private http: HttpClient) {
  }

  getDepartmentById(id: number) {
    return this.http.get(`http://localhost:8080/api/department/${id}`)
      .pipe(
        catchError(err => {
          console.error("Произошла ошибка", err)
          return throwError(err);
        })
      )
  }
}
