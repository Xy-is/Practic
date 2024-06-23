import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  constructor(private http: HttpClient, private cookieService:CookieService) {

  }

  getEmployees() {
    const token = this.cookieService.get('jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get('http://localhost:8080/api/employee/get', {
      headers:headers
    })
      .pipe(
        catchError(error => {
          console.error('Произошла ошибка:', error);
          return throwError(error);
        })
      );
  }

  deleteEmployee(id: number) {
    const token = this.cookieService.get('jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`http://localhost:8080/api/employee/delete/${id}`, {headers: headers})
  }

  createEmployees(employee: Employee): Observable<Employee> {
    const token = this.cookieService.get('jwt');
    console.log(employee)
    return this.http.post<Employee>('http://localhost:8080/api/employee/create', employee, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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
