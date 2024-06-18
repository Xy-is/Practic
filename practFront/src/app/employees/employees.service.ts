import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) {
  }

  getEmployees() {

    return this.http.get('http://localhost:8080/api/employee/get')
      .pipe(
        catchError(error => {
          console.error('Произошла ошибка:', error);
          return throwError(error);
        })
      );
  }

  deleteEmployee(id: number) {
    return this.http.delete(`http://localhost:8080/api/employee/delete/${id}`)
  }

  createEmployees(employee: Employee): Observable<Employee> {
    console.log(employee)
    return this.http.post<Employee>('http://localhost:8080/api/employee/create', employee, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}

export class Employee {
  firstName: string;
  lastName: string;
  position: string;

  constructor(firstName: string, lastName: string, position: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.position = position;
  }
}
