import {Injectable} from '@angular/core';
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Employee} from "../employees/employees.service";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) {
  }

  getDepartment() {

    return this.http.get('http://localhost:8080/api/department')
      .pipe(
        catchError(error => {
          console.error('Произошла ошибка:', error);
          return throwError(error);

        })
      );
  }


  deleteDepartment(id: number) {
    return this.http.delete(`http://localhost:8080/api/department/${id}`)
  }

  createDepartment(currentDepartment: {
    employeeDtos: string;
    name: string;
    id: string;
    managerId: string;
    projectDtos: string
  }) {
    console.log(currentDepartment)
    return this.http.post<Employee>('http://localhost:8080/api/department', currentDepartment, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
